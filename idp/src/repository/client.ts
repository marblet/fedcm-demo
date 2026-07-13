import { Client, type ClientRepository } from "../domain/client.js";

type ClientData = Omit<Client, "id">;
const sessions = new Map<string, ClientData>([
  [
    "client-1",
    {
      name: "Client 1",
      origins: ["https://rp.local:3001"],
      privacyPolicyUrl: "https://rp.local:3001/privacy",
      termsOfServiceUrl: "https://rp.local:3001/terms",
    },
  ],
]);

const getClient = (clientId: string): Client | undefined => {
  const clientData = sessions.get(clientId);
  if (!clientData) {
    return undefined;
  }
  return new Client(
    clientId,
    clientData.name,
    clientData.origins,
    clientData.privacyPolicyUrl,
    clientData.termsOfServiceUrl,
  );
};

export const clientRepository: ClientRepository = {
  get: getClient,
};
