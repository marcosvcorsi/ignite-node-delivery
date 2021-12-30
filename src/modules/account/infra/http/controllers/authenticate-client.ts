import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Controller } from '../../../../../shared/infra/http/controllers';
import { AuthenticateClientUseCase } from '../../../use-cases/authenticate-client';

export class AuthenticateClientController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateClientUseCase = container.resolve(
      AuthenticateClientUseCase,
    );

    const token = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return response.json({ token });
  }
}
