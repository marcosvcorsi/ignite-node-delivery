import { HashProvider } from "../../../shared/providers/hash";
import { UseCase } from "../../../shared/use-cases";
import { Client } from "../entities/client";
import { ClientAlreadyExistsError } from "../errors/client-already-exists";
import { ClientRepository } from "../repositories/client";

type Params = {
  username: string;
  password: string;
};

export class CreateClientUseCase implements UseCase<Params, Client> {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly hashProvider: HashProvider
  ) {}

  async execute({ username, password }: Params): Promise<Client> {
    const existingUsername = await this.clientRepository.findByUsername(
      username
    );

    if (existingUsername) {
      throw new ClientAlreadyExistsError();
    }

    const passwordHash = await this.hashProvider.generate(password);

    return this.clientRepository.create({
      username,
      password: passwordHash,
    });
  }
}
