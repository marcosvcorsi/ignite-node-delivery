import { Request, Response } from "express";
import { jwtConfig } from "../../../../../config/jwt";
import { Controller } from "../../../../../shared/infra/http/controllers";
import { BcryptHashProvider } from "../../../../../shared/infra/providers/bcrypt";
import { JwtTokenProvider } from "../../../../../shared/infra/providers/jwt";
import { PrismaClientRepository } from "../../../../clients/infra/database/prisma/client";
import { AuthenticateClientUseCase } from "../../../use-cases/authenticate-client";

export class AuthenticateClientController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateClientUseCase = new AuthenticateClientUseCase(
      new PrismaClientRepository(),
      new BcryptHashProvider(),
      new JwtTokenProvider(jwtConfig.secret)
    );

    const token = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return response.json({ token });
  }
}
