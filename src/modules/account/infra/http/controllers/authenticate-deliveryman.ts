import { Request, Response } from "express";
import { container } from "tsyringe";
import { Controller } from "../../../../../shared/infra/http/controllers";
import { AuthenticateDeliverymanUseCase } from "../../../use-cases/authenticate-deliveryman";

export class AuthenticateDeliverymanController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = container.resolve(
      AuthenticateDeliverymanUseCase
    );

    const token = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json({ token });
  }
}
