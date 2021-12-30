import { Delivery } from '../../entities/delivery';

export interface DeliveriesRepository {
  create(data: Omit<Delivery, 'id'>): Promise<Delivery>;
  findAvailable(): Promise<Delivery[]>;
  update(id: string, data: Partial<Delivery>): Promise<Delivery | void>;
}
