import { Request, Response } from "express";
import { Controller } from "../../../../../shared/infra/http/controllers";
import { BcryptHashProvider } from "../../../../../shared/infra/providers/bcrypt";
import { PrismaClientRepository } from "../../database/prisma/client";
import { CreateClientUseCase } from "../../../use-cases/create-client";
import { container } from "tsyringe";

export class CreateClientController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    const client = await createClientUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(client);
  }
}
