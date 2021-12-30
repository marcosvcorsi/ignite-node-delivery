import { Request, Response } from "express";
import { container } from "tsyringe";
import { Controller } from "../../../../../shared/infra/http/controllers";
import { CreateDeliverymanUseCase } from "../../../use-cases/create-deliveryman";

export class CreateDeliverymanController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createDeliverymanUseCase = container.resolve(
      CreateDeliverymanUseCase
    );

    const deliveryman = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(deliveryman);
  }
}
