import { Delivery } from "@/modules/deliveries/entities/delivery";

export class Deliveryman {
  id: string;
  username: string;
  password: string;
  deliveries?: Delivery[];
}
