import { ServerError } from '../../../shared/errors/server';

export class DeliverymanAlreadyExistsError extends ServerError {
  constructor() {
    super('Deliveryman already exists');

    this.name = 'DeliverymanAlreadyExistsError';
  }
}
