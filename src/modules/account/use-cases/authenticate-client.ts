import { inject, injectable } from 'tsyringe';

import { HashProvider } from '../../../shared/infra/providers/hash';
import { TokenProvider } from '../../../shared/infra/providers/token';
import { UnauthorizedError } from '../../../shared/infra/providers/unauthorized';
import { UseCase } from '../../../shared/use-cases';
import { ClientRepository } from '../../clients/infra/repositories/client';

type Params = {
  username: string;
  password: string;
};

type Result = {
  token: string;
};

@injectable()
export class AuthenticateClientUseCase implements UseCase<Params, Result> {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    @inject('HashProvider')
    private readonly hashProvider: HashProvider,
    @inject('ClientTokenProvider')
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute({ username, password }: Params): Promise<Result> {
    const client = await this.clientRepository.findByUsername(username);

    if (
      !client ||
      !(await this.hashProvider.compare(password, client.password))
    ) {
      throw new UnauthorizedError('Username or password invalid!');
    }

    const { id } = client;

    const token = await this.tokenProvider.generate({
      subject: id,
      payload: { username },
    });

    return { token };
  }
}
