import { Client } from '../../entities/client';

export interface ClientRepository {
  findById(id: string): Promise<Client | null>;
  findClientDeliveries(id: string): Promise<Client | null>;
  findByUsername(username: string): Promise<Client | null>;
  create(data: Omit<Client, 'id'>): Promise<Client>;
}
