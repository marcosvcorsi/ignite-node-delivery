import { HashProvider } from "../../../shared/infra/providers/hash";
import { TokenProvider } from "../../../shared/infra/providers/token";
import { UseCase } from "../../../shared/use-cases";
import { DeliverymanRepository } from "../../deliveryman/infra/repositories/deliveryman";
import { UnauthorizedError } from "../errors/unauthorized";

type Params = {
  username: string;
  password: string;
};

type Result = {
  token: string;
};

export class AuthenticateDeliverymanUseCase implements UseCase<Params, Result> {
  constructor(
    private readonly deliverymanRepository: DeliverymanRepository,
    private readonly hashProvider: HashProvider,
    private readonly tokenProvider: TokenProvider
  ) {}

  async execute({ username, password }: Params): Promise<Result> {
    const client = await this.deliverymanRepository.findByUsername(username);

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
