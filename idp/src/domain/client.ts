export class Client {
  constructor(
    public id: string,
    public name: string,
    public origins: string[],
    public privacyPolicyUrl?: string,
    public termsOfServiceUrl?: string,
  ) {}
}

export interface ClientRepository {
  get(clientId: string): Client | undefined;
}
