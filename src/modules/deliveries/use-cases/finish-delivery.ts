import { Deliveryman } from "@/modules/deliveryman/entities/deliveryman";
import { DeliverymanRepository } from "@/modules/deliveryman/infra/repositories/deliveryman";
import { NotFoundError } from "@/shared/errors/not-found";
import { UseCase } from "@/shared/use-cases";
import { Delivery } from "../entities/delivery";
import { DeliveriesRepository } from "../infra/repositories/deliveries";

type Params = {
  id: string;
  deliverymanId: string;
};

export class FinishDeliveryUseCase implements UseCase<Params, Delivery> {
  constructor(
    private readonly deliverymanRepository: DeliverymanRepository,
    private readonly deliveriesRepository: DeliveriesRepository
  ) {}

  async execute({ id, deliverymanId }: Params): Promise<Delivery> {
    const deliveryman = await this.deliverymanRepository.findById(
      deliverymanId
    );

    if (!deliveryman) {
      throw new NotFoundError(Deliveryman.name);
    }

    return this.deliveriesRepository.update(id, {
      endAt: new Date(),
      deliveryman,
    });
  }
}
