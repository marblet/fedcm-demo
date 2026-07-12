import type { Context } from "hono";
import { renderToString } from "hono/jsx/dom/server";
import { TopPage } from "../pages/top.js";
import { sessionRepository } from "../repository/sessions.js";
import { getSessionCookie } from "../http/cookies.js";

export const handleGetTop = (c: Context) => {
  const sessionId = getSessionCookie(c);
  const user = sessionId
    ? sessionRepository.get(sessionId)?.users[0]
    : undefined;

  return c.html(renderToString(TopPage({ username: user?.name })));
};
