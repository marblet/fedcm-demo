import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { renderToString } from "hono/jsx/dom/server";
import { LoginPage } from "../pages/login.js";
import {
  generateSession,
  getSessionUserIds,
  updateSession,
} from "../repository/sessions.js";
import { verifyUser } from "../repository/users.js";

const sessionCookieName = "session";
const sessionMaxAgeSeconds = 60 * 60 * 24;

export const handleGetLogin = (c: Context) => {
  return c.html(renderToString(LoginPage({})));
};

export const handlePostLogin = async (c: Context) => {
  const body = await c.req.parseBody();
  const id = String(body.id ?? "");
  const password = String(body.password ?? "");

  const user = verifyUser(id, password);

  if (!user) {
    return c.html(
      renderToString(LoginPage({ error: "IDまたはPassが違います。" })),
      401,
    );
  }

  // 未ログイン、またはセッションが無効の場合はセッションを発行する
  const sessionId = getCookie(c, sessionCookieName);
  const currentSessionUserIds = sessionId
    ? getSessionUserIds(sessionId)
    : undefined;
  if (!sessionId || !currentSessionUserIds) {
    const sessionId = generateSession([user.id]);
    setCookie(c, sessionCookieName, sessionId, {
      domain: "idp.local",
      expires: new Date(Date.now() + sessionMaxAgeSeconds * 1000),
      httpOnly: true,
      maxAge: sessionMaxAgeSeconds,
      path: "/",
      sameSite: "Lax",
    });
    return c.redirect("/");
  }

  // 有効なセッションがある場合はユーザIDをセッションの先頭に追加する
  const userIds = [
    user.id,
    ...currentSessionUserIds.filter((id) => id !== user.id),
  ];
  console.log({ sessionId, userIds });
  updateSession(sessionId, userIds);

  return c.redirect("/");
};
