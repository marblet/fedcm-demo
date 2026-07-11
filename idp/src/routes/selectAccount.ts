import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import { renderToString } from "hono/jsx/dom/server";
import { SelectAccountPage } from "../pages/selectAccount.js";
import { getSessionUserIds, updateSession } from "../repository/sessions.js";
import { getUser } from "../repository/users.js";

const sessionCookieName = "session";

const getSessionId = (c: Context): string | undefined => {
  return getCookie(c, sessionCookieName);
};

const getAccounts = (sessionId: string | undefined) => {
  const userIds = sessionId ? getSessionUserIds(sessionId) : undefined;

  if (!userIds) {
    return [];
  }

  return userIds.flatMap((userId) => {
    const user = getUser(userId);
    return user ? [{ id: user.id, name: user.name }] : [];
  });
};

export const handleGetSelectAccount = (c: Context) => {
  return c.html(
    renderToString(SelectAccountPage({ accounts: getAccounts(getSessionId(c)) })),
  );
};

export const handlePostSelectAccount = async (c: Context) => {
  const sessionId = getSessionId(c);
  const userIds = sessionId ? getSessionUserIds(sessionId) : undefined;

  if (!sessionId || !userIds) {
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

  if (!userIds.includes(userId)) {
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

  updateSession(sessionId, [userId, ...userIds.filter((id) => id !== userId)]);

  return c.redirect("/select_account");
};
