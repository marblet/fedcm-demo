import { Context } from "hono";
import { getSessionCookie } from "../http/cookies.js";
import { sessionRepository } from "../repository/sessions.js";

export const handleGetAccounts = (c: Context) => {
  // リクエストに Sec-Fetch-Dest: webidentity HTTP ヘッダーが含まれていることを確認
  const secFetchDest = c.req.header("Sec-Fetch-Dest");
  if (secFetchDest !== "webidentity") {
    return c.json({ error: "Sec-Fetch-Dest is not webidentity" }, 400);
  }

  // セッション Cookie を、すでにログインしているアカウントの ID と照合
  const sessionId = getSessionCookie(c);
  const session = sessionId ? sessionRepository.get(sessionId) : undefined;
  if (!session) {
    return c.json({ error: "No valid session" }, 401);
  }

  // アカウントのリストを返却
  return c.json({
    accounts: session.users.map((user) => ({
      id: user.id,
      username: user.name,
    })),
  });
};
