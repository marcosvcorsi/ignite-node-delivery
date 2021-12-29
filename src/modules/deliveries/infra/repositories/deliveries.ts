import { Delivery } from "../../entities/delivery";

export interface DeliveriesRepository {
  create(data: Omit<Delivery, "id">): Promise<Delivery>;
  findAvailable(): Promise<Delivery[]>;
}
