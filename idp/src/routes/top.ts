import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import { renderToString } from "hono/jsx/dom/server";
import { TopPage } from "../pages/top.js";
import { getSessionUserIds } from "../repository/sessions.js";
import { getUser } from "../repository/users.js";

const sessionCookieName = "session";

export const handleGetTop = (c: Context) => {
  const sessionId = getCookie(c, sessionCookieName);
  const userId = sessionId ? getSessionUserIds(sessionId)?.[0] : undefined;
  console.log({ sessionId, userId });
  const user = userId ? getUser(userId) : undefined;

  return c.html(renderToString(TopPage({ username: user?.name })));
};
