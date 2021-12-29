import { FindAvailableDeliveriesUseCase } from "@/modules/deliveries/use-cases/find-available";
import { Controller } from "@/shared/infra/http/controllers";
import { Request, Response } from "express";
import { PrismaDeliveriesRepository } from "../../database/prisma/deliveries";

export class FindAvailableDeliveriesController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAvailableDeliveriesUseCase = new FindAvailableDeliveriesUseCase(
      new PrismaDeliveriesRepository()
    );

    const deliveries = await findAvailableDeliveriesUseCase.execute();

    return response.json(deliveries);
  }
}
