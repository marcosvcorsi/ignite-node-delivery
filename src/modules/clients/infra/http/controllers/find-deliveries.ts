import { FindClientDeliveriesUseCase } from "@/modules/clients/use-cases/find-deliveries";
import { Controller } from "@/shared/infra/http/controllers";
import { Request } from "express";
import { Response } from "express-serve-static-core";
import { container } from "tsyringe";

export class FindClientDeliveriesController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;

    const findClientDeliveriesUseCase = container.resolve(
      FindClientDeliveriesUseCase
    );

    const deliveries = await findClientDeliveriesUseCase.execute({
      clientId: clientId!,
    });

    return response.json(deliveries);
  }
}
