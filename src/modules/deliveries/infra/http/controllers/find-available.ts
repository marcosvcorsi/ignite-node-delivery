import { FindAvailableDeliveriesUseCase } from "@/modules/deliveries/use-cases/find-available";
import { Controller } from "@/shared/infra/http/controllers";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindAvailableDeliveriesController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAvailableDeliveriesUseCase = container.resolve(
      FindAvailableDeliveriesUseCase
    );

    const deliveries = await findAvailableDeliveriesUseCase.execute();

    return response.json(deliveries);
  }
}
