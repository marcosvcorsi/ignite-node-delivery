import { HashProvider } from "../../../shared/infra/providers/hash";
import { UseCase } from "../../../shared/use-cases";
import { Deliveryman } from "../entities/deliveryman";
import { DeliverymanAlreadyExistsError } from "../errors/deliveryman-already-exists";
import { DeliverymanRepository } from "../infra/repositories/deliveryman";

type Params = {
  username: string;
  password: string;
};

export class CreateDeliverymanUseCase implements UseCase<Params, Deliveryman> {
  constructor(
    private readonly deliverymanRepository: DeliverymanRepository,
    private readonly hashProvider: HashProvider
  ) {}

  async execute({ username, password }: Params): Promise<Deliveryman> {
    const existingUsername = await this.deliverymanRepository.findByUsername(
      username
    );

    if (existingUsername) {
      throw new DeliverymanAlreadyExistsError();
    }

    const passwordHash = await this.hashProvider.generate(password);

    return this.deliverymanRepository.create({
      username,
      password: passwordHash,
    });
  }
}
