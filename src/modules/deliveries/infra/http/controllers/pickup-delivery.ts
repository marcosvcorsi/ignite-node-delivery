import { PickUpDeliveryUseCase } from "@/modules/deliveries/use-cases/pickup-delivery";
import { PrismaDeliverymanRepository } from "@/modules/deliveryman/infra/database/prisma/deliveryman";
import { Controller } from "@/shared/infra/http/controllers";
import { Request, Response } from "express";
import { PrismaDeliveriesRepository } from "../../database/prisma/deliveries";

export class PickUpDeliveryController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request;
    const { id } = request.params;

    const pickUpDeliveryUseCase = new PickUpDeliveryUseCase(
      new PrismaDeliverymanRepository(),
      new PrismaDeliveriesRepository()
    );

    const delivery = await pickUpDeliveryUseCase.execute({
      id,
      deliverymanId: deliverymanId!,
    });

    return response.json(delivery);
  }
}
