import { inject, injectable } from 'tsyringe';

import { NotFoundError } from '../../../shared/errors/not-found';
import { UseCase } from '../../../shared/use-cases';
import { Client } from '../../clients/entities/client';
import { ClientRepository } from '../../clients/infra/repositories/client';
import { Delivery } from '../entities/delivery';
import { DeliveriesRepository } from '../infra/repositories/deliveries';

type Params = {
  itemName: string;
  clientId: string;
};

@injectable()
export class CreateDeliveryUseCase implements UseCase<Params, Delivery> {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    @inject('DeliveriesRepository')
    private readonly deliveriesRepository: DeliveriesRepository,
  ) {}

  async execute({ itemName, clientId }: Params): Promise<Delivery> {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new NotFoundError(Client.name);
    }

    return this.deliveriesRepository.create({
      itemName,
      client,
    });
  }
}
