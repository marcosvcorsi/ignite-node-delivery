import { HashProvider } from "../../../shared/infra/providers/hash";
import { TokenProvider } from "../../../shared/infra/providers/token";
import { UseCase } from "../../../shared/use-cases";
import { ClientRepository } from "../../clients/infra/repositories/client";
import { UnauthorizedError } from "../errors/unauthorized";

type Params = {
  username: string;
  password: string;
};

type Result = {
  token: string;
};

export class AuthenticateClientUseCase implements UseCase<Params, Result> {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly hashProvider: HashProvider,
    private readonly tokenProvider: TokenProvider
  ) {}

  async execute({ username, password }: Params): Promise<Result> {
    const client = await this.clientRepository.findByUsername(username);

    if (
      !client ||
      !(await this.hashProvider.compare(password, client.password))
    ) {
      throw new UnauthorizedError();
    }

    const { id } = client;

    const token = await this.tokenProvider.generate({
      subject: id,
      payload: { username },
    });

    return { token };
  }
}
