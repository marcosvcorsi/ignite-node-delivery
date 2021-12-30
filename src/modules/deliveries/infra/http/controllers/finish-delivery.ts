import { FinishDeliveryUseCase } from "@/modules/deliveries/use-cases/finish-delivery";
import { PrismaDeliverymanRepository } from "@/modules/deliveryman/infra/database/prisma/deliveryman";
import { Controller } from "@/shared/infra/http/controllers";
import { Request, Response } from "express";
import { PrismaDeliveriesRepository } from "../../database/prisma/deliveries";

export class FinishDeliveryController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request;
    const { id } = request.params;

    const finishDeliveryUseCase = new FinishDeliveryUseCase(
      new PrismaDeliverymanRepository(),
      new PrismaDeliveriesRepository()
    );

    await finishDeliveryUseCase.execute({
      id,
      deliverymanId: deliverymanId!,
    });

    return response.status(204).send();
  }
}
