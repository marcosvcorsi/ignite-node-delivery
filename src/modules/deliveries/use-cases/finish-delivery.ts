import { inject, injectable } from 'tsyringe';

import { Deliveryman } from '@/modules/deliveryman/entities/deliveryman';
import { DeliverymanRepository } from '@/modules/deliveryman/infra/repositories/deliveryman';
import { NotFoundError } from '@/shared/errors/not-found';
import { UseCase } from '@/shared/use-cases';

import { DeliveriesRepository } from '../infra/repositories/deliveries';

type Params = {
  id: string;
  deliverymanId: string;
};

@injectable()
export class FinishDeliveryUseCase implements UseCase<Params, void> {
  constructor(
    @inject('DeliverymanRepository')
    private readonly deliverymanRepository: DeliverymanRepository,
    @inject('DeliveriesRepository')
    private readonly deliveriesRepository: DeliveriesRepository,
  ) {}

  async execute({ id, deliverymanId }: Params): Promise<void> {
    const deliveryman = await this.deliverymanRepository.findById(
      deliverymanId,
    );

    if (!deliveryman) {
      throw new NotFoundError(Deliveryman.name);
    }

    await this.deliveriesRepository.update(id, {
      endAt: new Date(),
      deliveryman,
    });
  }
}
