import { Deliveryman } from '../../entities/deliveryman';

export interface DeliverymanRepository {
  findById(id: string): Promise<Deliveryman | null>;
  findDeliverymanDeliveries(id: string): Promise<Deliveryman | null>;
  findByUsername(username: string): Promise<Deliveryman | null>;
  create(data: Omit<Deliveryman, 'id'>): Promise<Deliveryman>;
}
