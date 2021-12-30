import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindClientDeliveriesUseCase } from '@/modules/clients/use-cases/find-deliveries';
import { Controller } from '@/shared/infra/http/controllers';

export class FindClientDeliveriesController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;

    const findClientDeliveriesUseCase = container.resolve(
      FindClientDeliveriesUseCase,
    );

    const deliveries = await findClientDeliveriesUseCase.execute({
      clientId: clientId!,
    });

    return response.json(deliveries);
  }
}
