import { Client } from "../entities/client";

export interface ClientRepository {
  findByUsername(username: string): Promise<Client | null>;
  create(data: Omit<Client, "id">): Promise<Client>;
}
