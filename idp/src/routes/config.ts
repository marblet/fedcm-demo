import type { Context } from "hono";

export const handleGetConfig = (c: Context) => {
  return c.json({
    accounts_endpoint: "/accounts",
    login_url: "/login",
  });
};
