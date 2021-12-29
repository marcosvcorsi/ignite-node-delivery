import { UseCase } from "@/shared/use-cases";
import { Delivery } from "../entities/delivery";
import { DeliveriesRepository } from "../infra/repositories/deliveries";

export class FindAvailableDeliveriesUseCase
  implements UseCase<void, Delivery[]>
{
  constructor(private readonly deliveriesRepository: DeliveriesRepository) {}

  async execute(): Promise<Delivery[]> {
    return this.deliveriesRepository.findAvailable();
  }
}
