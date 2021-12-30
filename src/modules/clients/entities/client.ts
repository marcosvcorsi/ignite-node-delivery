import { Delivery } from '@/modules/deliveries/entities/delivery';

export class Client {
  id: string;
  username: string;
  password: string;
  deliveries?: Delivery[];
}
