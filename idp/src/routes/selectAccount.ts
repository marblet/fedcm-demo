import type { Context } from "hono";
import { renderToString } from "hono/jsx/dom/server";
import { SelectAccountPage } from "../pages/selectAccount.js";
import { sessionRepository } from "../repository/sessions.js";
import { getSessionCookie } from "../http/cookies.js";

const getAccounts = (sessionId: string | undefined) => {
  const session = sessionId ? sessionRepository.get(sessionId) : undefined;

  if (!session) {
    return [];
  }

  return session.users.map((user) => ({ id: user.id, name: user.name }));
};

export const handleGetSelectAccount = (c: Context) => {
  return c.html(
    renderToString(
      SelectAccountPage({ accounts: getAccounts(getSessionCookie(c)) }),
    ),
  );
};

export const handlePostSelectAccount = async (c: Context) => {
  const sessionId = getSessionCookie(c);
  const session = sessionId ? sessionRepository.get(sessionId) : undefined;

  if (!session) {
    return c.html(
      renderToString(
        SelectAccountPage({
          accounts: [],
          error: "有効なセッションがありません。",
        }),
      ),
      401,
    );
  }

  const body = await c.req.parseBody();
  const userId = String(body.userId ?? "");
  const user = session.users.find((sessionUser) => sessionUser.id === userId);

  if (!user) {
    return c.html(
      renderToString(
        SelectAccountPage({
          accounts: getAccounts(sessionId),
          error: "指定されたユーザはこのセッションに含まれていません。",
        }),
      ),
      400,
    );
  }

  session.selectActiveUser(user, sessionRepository);
  return c.redirect("/select_account");
};
