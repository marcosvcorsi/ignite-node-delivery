import { Request, Response } from "express";
import { Controller } from "../../../../../shared/infra/http/controllers";
import { BcryptHashProvider } from "../../../../../shared/infra/providers/bcrypt";
import { CreateDeliverymanUseCase } from "../../../use-cases/create-deliveryman";
import { PrismaDeliverymanRepository } from "../../database/prisma/deliveryman";

export class CreateDeliverymanController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createDeliverymanUseCase = new CreateDeliverymanUseCase(
      new PrismaDeliverymanRepository(),
      new BcryptHashProvider()
    );

    const deliveryman = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(deliveryman);
  }
}
