import { Client } from "../../clients/entities/client";
import { Deliveryman } from "../../deliveryman/entities/deliveryman";

export class Delivery {
  id?: string;
  client?: Client;
  itemName: string;
  deliveryman?: Deliveryman;
  endAt?: Date | null;
}
