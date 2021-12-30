import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Controller } from '../../../../../shared/infra/http/controllers';
import { CreateDeliveryUseCase } from '../../../use-cases/create-delivery';

export class CreateDeliveryController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { itemName } = request.body;

    const createDeliveryUseCase = container.resolve(CreateDeliveryUseCase);

    const delivery = await createDeliveryUseCase.execute({
      itemName,
      clientId: clientId!,
    });

    return response.status(201).json(delivery);
  }
}
