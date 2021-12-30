import { UseCase } from "@/shared/use-cases";
import { inject, injectable } from "tsyringe";
import { Delivery } from "../entities/delivery";
import { DeliveriesRepository } from "../infra/repositories/deliveries";

@injectable()
export class FindAvailableDeliveriesUseCase
  implements UseCase<void, Delivery[]>
{
  constructor(
    @inject("DeliveriesRepository")
    private readonly deliveriesRepository: DeliveriesRepository
  ) {}

  async execute(): Promise<Delivery[]> {
    return this.deliveriesRepository.findAvailable();
  }
}
