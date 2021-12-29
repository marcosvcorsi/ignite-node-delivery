import { Request, Response } from "express";
import { jwtConfig } from "../../../../../config/jwt";
import { Controller } from "../../../../../shared/infra/http/controllers";
import { BcryptHashProvider } from "../../../../../shared/infra/providers/bcrypt";
import { JwtTokenProvider } from "../../../../../shared/infra/providers/jwt";
import { PrismaDeliverymanRepository } from "../../../../deliveryman/infra/database/prisma/deliveryman";
import { AuthenticateDeliverymanUseCase } from "../../../use-cases/authenticate-deliveryman";

export class AuthenticateDeliverymanController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      new PrismaDeliverymanRepository(),
      new BcryptHashProvider(),
      new JwtTokenProvider(jwtConfig.deliverymanSecret)
    );

    const token = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json({ token });
  }
}
