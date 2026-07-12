import type { Context } from "hono";

export const handleGetWellKnownWebIdentity = (c: Context) => {
  return c.json({
    accounts_endpoint: "https://idp.local/accounts",
    login_url: "https://idp.local/login",
    provider_urls: ["https://idp.local/config.json"],
  });
};
