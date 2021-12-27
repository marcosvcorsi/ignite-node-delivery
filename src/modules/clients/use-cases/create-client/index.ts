import { HashProvider } from "../../../../shared/providers/hash";
import { Client } from "../../entities/client";
import { ClientAlreadyExistsError } from "../../errors/client-already-exists";
import { ClientRepository } from "../../repositories/client";

type Params = {
  username: string;
  password: string;
};

type Result = Promise<Client>;

export class CreateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly hashProvider: HashProvider
  ) {}

  async execute({ username, password }: Params): Result {
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
