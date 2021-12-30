import { PrismaRepository } from "../../../../../shared/infra/database/repositories/prisma";
import { Delivery } from "../../../entities/delivery";
import { DeliveriesRepository } from "../../repositories/deliveries";

export class PrismaDeliveriesRepository
  extends PrismaRepository
  implements DeliveriesRepository
{
  async update(
    id: string,
    { endAt, deliveryman }: Partial<Delivery>
  ): Promise<Delivery> {
    const data = {};
    const where = { id };

    const deliverymanId = deliveryman?.id;

    if (endAt) {
      Object.assign(data, { endAt });
      Object.assign(where, { deliverymanId });
    }

    if (deliveryman) {
      Object.assign(data, { deliverymanId });
    }

    return this.prismaClient.deliveries.update({
      where,
      data,
    });
  }

  async findAvailable(): Promise<Delivery[]> {
    return this.prismaClient.deliveries.findMany({
      where: {
        endAt: null,
        deliverymanId: null,
      },
      include: {
        client: true,
      },
    });
  }

  async create({ itemName, client }: Omit<Delivery, "id">): Promise<Delivery> {
    return this.prismaClient.deliveries.create({
      data: {
        itemName,
        clientId: client?.id!,
      },
    });
  }
}
