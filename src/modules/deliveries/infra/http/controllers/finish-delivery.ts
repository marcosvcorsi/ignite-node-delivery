import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FinishDeliveryUseCase } from '@/modules/deliveries/use-cases/finish-delivery';
import { Controller } from '@/shared/infra/http/controllers';

export class FinishDeliveryController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request;
    const { id } = request.params;

    const finishDeliveryUseCase = container.resolve(FinishDeliveryUseCase);

    await finishDeliveryUseCase.execute({
      id,
      deliverymanId: deliverymanId!,
    });

    return response.status(204).send();
  }
}
