import { ServerError } from '../../../shared/errors/server';

export class ClientAlreadyExistsError extends ServerError {
  constructor() {
    super('Client already exists');

    this.name = 'ClientAlreadyExistsError';
  }
}
