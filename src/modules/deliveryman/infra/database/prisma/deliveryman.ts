import { PrismaRepository } from "../../../../../shared/infra/database/repositories/prisma";
import { Deliveryman } from "../../../entities/deliveryman";
import { DeliverymanRepository } from "../../repositories/deliveryman";

export class PrismaDeliverymanRepository
  extends PrismaRepository
  implements DeliverymanRepository
{
  async findByUsername(username: string): Promise<Deliveryman | null> {
    return this.prismaClient.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
  }

  async create(data: Omit<Deliveryman, "id">): Promise<Deliveryman> {
    return this.prismaClient.deliveryman.create({
      data,
    });
  }
}
