import { Request, Response } from "express";
import { Controller } from "../../../../../shared/infra/http/controllers";
import { PrismaClientRepository } from "../../../../clients/infra/database/prisma/client";
import { CreateDeliverymanUseCase } from "../../../../deliveryman/use-cases/create-deliveryman";
import { CreateDeliveryUseCase } from "../../../use-cases/create-delivery";
import { PrismaDeliveriesRepository } from "../../database/prisma/deliveries";

export class CreateDeliveryController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request;
    const { itemName } = request.body;

    const createDeliveryUseCase = new CreateDeliveryUseCase(
      new PrismaClientRepository(),
      new PrismaDeliveriesRepository()
    );

    const delivery = await createDeliveryUseCase.execute({
      itemName,
      clientId: clientId!,
    });

    return response.status(201).json(delivery);
  }
}
