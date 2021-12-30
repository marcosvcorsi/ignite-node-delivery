import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindDeliverymanDeliveriesUseCase } from '@/modules/deliveryman/use-cases/find-deliveries';
import { Controller } from '@/shared/infra/http/controllers';

export class FindDeliverymanDeliveriesController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request;

    const findDeliverymanDeliveriesUseCase = container.resolve(
      FindDeliverymanDeliveriesUseCase,
    );

    const deliveries = await findDeliverymanDeliveriesUseCase.execute({
      deliverymanId: deliverymanId!,
    });

    return response.json(deliveries);
  }
}
