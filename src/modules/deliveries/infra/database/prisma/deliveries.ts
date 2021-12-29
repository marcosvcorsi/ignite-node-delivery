import { PrismaRepository } from "../../../../../shared/infra/database/repositories/prisma";
import { Delivery } from "../../../entities/delivery";
import { DeliveriesRepository } from "../../repositories/deliveries";

export class PrismaDeliveriesRepository
  extends PrismaRepository
  implements DeliveriesRepository
{
  async findAvailable(): Promise<Delivery[]> {
    return this.prismaClient.deliveries.findMany({
      where: {
        endAt: null,
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
