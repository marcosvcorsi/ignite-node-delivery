import { ServerError } from './server';

export class NotFoundError extends ServerError {
  constructor(entityName: string = 'Entity') {
    super(`${entityName} not found`, 404);

    this.name = 'NotFoundError';
  }
}
