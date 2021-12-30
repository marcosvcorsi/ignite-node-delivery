import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { PickUpDeliveryUseCase } from '@/modules/deliveries/use-cases/pickup-delivery';
import { Controller } from '@/shared/infra/http/controllers';

export class PickUpDeliveryController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request;
    const { id } = request.params;

    const pickUpDeliveryUseCase = container.resolve(PickUpDeliveryUseCase);

    const delivery = await pickUpDeliveryUseCase.execute({
      id,
      deliverymanId: deliverymanId!,
    });

    return response.json(delivery);
  }
}
