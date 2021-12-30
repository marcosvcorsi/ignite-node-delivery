import { Client } from "@/modules/clients/entities/client";
import { ClientRepository } from "@/modules/clients/infra/repositories/client";
import { NotFoundError } from "@/shared/errors/not-found";
import { UseCase } from "@/shared/use-cases";
import { Delivery } from "../../deliveries/entities/delivery";

type Params = {
  clientId: string;
};

export class FindClientDeliveriesUseCase
  implements UseCase<Params, Delivery[]>
{
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute({ clientId }: Params): Promise<Delivery[]> {
    const client = await this.clientRepository.findClientDeliveries(clientId);

    if (!client) {
      throw new NotFoundError(Client.name);
    }

    return client.deliveries || [];
  }
}
