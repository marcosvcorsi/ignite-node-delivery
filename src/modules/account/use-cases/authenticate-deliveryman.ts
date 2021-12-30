import { HashProvider } from "../../../shared/infra/providers/hash";
import { TokenProvider } from "../../../shared/infra/providers/token";
import { UseCase } from "../../../shared/use-cases";
import { DeliverymanRepository } from "../../deliveryman/infra/repositories/deliveryman";
import { UnauthorizedError } from "../../../shared/infra/providers/unauthorized";
import { inject, injectable } from "tsyringe";

type Params = {
  username: string;
  password: string;
};

type Result = {
  token: string;
};

@injectable()
export class AuthenticateDeliverymanUseCase implements UseCase<Params, Result> {
  constructor(
    @inject("DeliverymanRepository")
    private readonly deliverymanRepository: DeliverymanRepository,
    @inject("HashProvider")
    private readonly hashProvider: HashProvider,
    @inject("DeliverymanTokenProvider")
    private readonly tokenProvider: TokenProvider
  ) {}

  async execute({ username, password }: Params): Promise<Result> {
    const client = await this.deliverymanRepository.findByUsername(username);

    if (
      !client ||
      !(await this.hashProvider.compare(password, client.password))
    ) {
      throw new UnauthorizedError("Username or password invalid!");
    }

    const { id } = client;

    const token = await this.tokenProvider.generate({
      subject: id,
      payload: { username },
    });

    return { token };
  }
}
