import type { Context } from "hono";
import { Jwt } from "hono/utils/jwt";
import { privateKey } from "../index.js";
import { getSessionCookie } from "../http/cookies.js";
import { sessionRepository } from "../repository/sessions.js";
import { clientRepository } from "../repository/client.js";

export const handlePostAssertion = async (c: Context) => {
  const contentType = c.req.header("Content-Type");
  if (contentType !== "application/x-www-form-urlencoded") {
    return c.json(
      { error: "Content-Type must be application/x-www-form-urlencoded" },
      415,
    );
  }
  const requestBody = await c.req.parseBody();

  // リクエストに Sec-Fetch-Dest: webidentity HTTP ヘッダーが含まれていることを確認
  const secFetchDest = c.req.header("Sec-Fetch-Dest");
  if (secFetchDest !== "webidentity") {
    return c.json(
      {
        error: {
          code: "invalid_request",
          message: "Sec-Fetch-Dest is not webidentity",
        },
      },
      403,
    );
  }

  // Origin ヘッダーを client_id によって決定された RP オリジンと照合。一致しない場合は不承認。
  const clientId = requestBody["client_id"];
  if (typeof clientId !== "string") {
    return c.json(
      { error: { code: "invalid_request", message: "client_id is required" } },
      400,
    );
  }
  const client = clientRepository.get(clientId);
  if (!client) {
    return c.json(
      {
        error: { code: "invalid_request", message: "client_id does not match" },
      },
      400,
    );
  }
  const origin = c.req.header("Origin");
  if (typeof origin !== "string" || !client.origins.includes(origin)) {
    return c.json(
      {
        error: {
          code: "invalid_request",
          message: "Origin does not match client_id",
        },
      },
      400,
    );
  }
  // CORS（クロスオリジン リソース シェアリング）でリクエストに応答
  c.header("Access-Control-Allow-Origin", origin);
  c.header("Access-Control-Allow-Credentials", "true");
  c.header("Vary", "Origin");

  // account_id を、すでにログインしているアカウントの ID と照合。一致しない場合は拒否。
  const sessionId = getSessionCookie(c);
  const session = sessionId ? sessionRepository.get(sessionId) : undefined;
  if (!session) {
    return c.json(
      { error: { code: "invalid_request", message: "No valid session" } },
      401,
    );
  }
  const accountId = requestBody["account_id"];
  if (typeof accountId !== "string") {
    return c.json(
      { error: { code: "invalid_request", message: "account_id is required" } },
      400,
    );
  }
  if (!session.isLoggedInAs(accountId)) {
    return c.json(
      {
        error: {
          code: "access_denied",
          message: "account_id does not match logged in user",
        },
      },
      403,
    );
  }
  // ID Tokenを生成
  const currentTime = Math.floor(Date.now() / 1000);
  const idToken = await Jwt.sign(
    {
      iss: "https://idp.local",
      sub: accountId,
      aud: clientId,
      exp: currentTime + 3600, // 1時間有効
      iat: currentTime,
    },
    privateKey.export({ format: "jwk" }),
    "ES256",
  );

  // トークンで応答。リクエストが拒否された場合は、エラーレスポンスで応答。
  return c.json({
    token: {
      id_token: idToken,
    },
  });
};
