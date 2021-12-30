import { FindDeliverymanDeliveriesUseCase } from "@/modules/deliveryman/use-cases/find-deliveries";
import { Controller } from "@/shared/infra/http/controllers";
import { Request, Response } from "express";
import { PrismaDeliverymanRepository } from "../../database/prisma/deliveryman";

export class FindDeliverymanDeliveriesController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliverymanId } = request;

    const findDeliverymanDeliveriesUseCase =
      new FindDeliverymanDeliveriesUseCase(new PrismaDeliverymanRepository());

    const deliveries = await findDeliverymanDeliveriesUseCase.execute({
      deliverymanId: deliverymanId!,
    });

    return response.json(deliveries);
  }
}
