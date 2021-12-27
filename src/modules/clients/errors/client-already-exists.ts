export class ClientAlreadyExistsError extends Error {
  constructor() {
    super("Client already exists");

    this.name = "ClientAlreadyExistsError";
  }
}
