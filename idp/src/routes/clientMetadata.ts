import type { Context } from "hono";
import { clientRepository } from "../repository/client.js";

export const handleGetClientMetadata = (c: Context) => {
  // リクエストに Sec-Fetch-Dest: webidentity HTTP ヘッダーが含まれていることを確認
  const secFetchDest = c.req.header("Sec-Fetch-Dest");
  if (secFetchDest !== "webidentity") {
    return c.json({ error: "Sec-Fetch-Dest is not webidentity" }, 403);
  }

  const clientId = c.req.query("client_id");
  const client = clientId ? clientRepository.get(clientId) : undefined;

  if (!client) {
    return c.json({ error: "Client not found" }, 404);
  }

  return c.json({
    client_id: client.id,
    privacy_policy_url: client.privacyPolicyUrl,
    terms_of_service_url: client.termsOfServiceUrl,
  });
};
