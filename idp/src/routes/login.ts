import type { Context } from "hono";
import { renderToString } from "hono/jsx/dom/server";
import { Session } from "../domain/session.js";
import { LoginPage } from "../pages/login.js";
import { sessionRepository } from "../repository/sessions.js";
import { verifyUser } from "../repository/users.js";
import { getSessionCookie, setSessionCookie } from "../http/cookies.js";

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

  const sessionId = getSessionCookie(c);
  const session = sessionId ? sessionRepository.get(sessionId) : undefined;

  if (!session) {
    const session = Session.generate(user, sessionRepository);
    setSessionCookie(c, session.id);
    return c.redirect("/");
  }

  session.selectActiveUser(user, sessionRepository);
  return c.redirect("/");
};
