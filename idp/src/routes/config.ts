import type { Context } from "hono";

export const handleGetConfig = (c: Context) => {
  return c.json({
    accounts_endpoint: "https://idp.local/accounts",
    login_url: "https://idp.local/login",
    id_assertion_endpoint: "https://idp.local/assertion",
    client_metadata_endpoint: "https://idp.local/client_metadata",
    supports_use_other_account: true,
  });
};
