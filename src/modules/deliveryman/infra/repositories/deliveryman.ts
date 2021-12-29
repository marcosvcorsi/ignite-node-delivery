import { Deliveryman } from "../../entities/deliveryman";

export interface DeliverymanRepository {
  findByUsername(username: string): Promise<Deliveryman | null>;
  create(data: Omit<Deliveryman, "id">): Promise<Deliveryman>;
}
