import { inject, injectable } from 'tsyringe';

import { HashProvider } from '../../../shared/infra/providers/hash';
import { UseCase } from '../../../shared/use-cases';
import { Client } from '../entities/client';
import { ClientAlreadyExistsError } from '../errors/client-already-exists';
import { ClientRepository } from '../infra/repositories/client';

type Params = {
  username: string;
  password: string;
};

@injectable()
export class CreateClientUseCase implements UseCase<Params, Client> {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    @inject('HashProvider')
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ username, password }: Params): Promise<Client> {
    const existingUsername = await this.clientRepository.findByUsername(
      username,
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
