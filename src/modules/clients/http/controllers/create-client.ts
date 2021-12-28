import { Request, Response } from "express";
import { Controller } from "../../../../shared/controllers";
import { BcryptHashProvider } from "../../../../shared/providers/bcrypt";
import { PrismaClientRepository } from "../../repositories/prisma/client";
import { CreateClientUseCase } from "../../use-cases/create-client";

export class CreateClientController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createClientUseCase = new CreateClientUseCase(
      new PrismaClientRepository(),
      new BcryptHashProvider()
    );

    const client = await createClientUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(client);
  }
}
