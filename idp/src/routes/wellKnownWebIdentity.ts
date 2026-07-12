import type { Context } from "hono";

export const handleGetWellKnownWebIdentity = (c: Context) => {
  return c.json({
    accounts_endpoint: "https://idp.local:3000/accounts",
    login_url: "https://idp.local:3000/login",
  });
};
