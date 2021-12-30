import { Delivery } from "@/modules/deliveries/entities/delivery";
import { NotFoundError } from "@/shared/errors/not-found";
import { UseCase } from "@/shared/use-cases";
import { Deliveryman } from "../entities/deliveryman";
import { DeliverymanRepository } from "../infra/repositories/deliveryman";

type Params = {
  deliverymanId: string;
};

export class FindDeliverymanDeliveriesUseCase
  implements UseCase<Params, Delivery[]>
{
  constructor(private readonly deliverymanRepository: DeliverymanRepository) {}

  async execute({ deliverymanId }: Params): Promise<Delivery[]> {
    const deliveryman =
      await this.deliverymanRepository.findDeliverymanDeliveries(deliverymanId);

    if (!deliveryman) {
      throw new NotFoundError(Deliveryman.name);
    }

    return deliveryman.deliveries || [];
  }
}
