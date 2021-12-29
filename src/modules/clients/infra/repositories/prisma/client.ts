import { PrismaRepository } from "../../../../../shared/infra/database/repositories/prisma";
import { Client } from "../../../entities/client";
import { ClientRepository } from "../client";

export class PrismaClientRepository
  extends PrismaRepository
  implements ClientRepository
{
  async findById(id: string): Promise<Client | null> {
    return this.prismaClient.clients.findUnique({
      where: {
        id,
      },
    });
  }
  async findByUsername(username: string): Promise<Client | null> {
    return this.prismaClient.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
  }

  async create(data: Omit<Client, "id">): Promise<Client> {
    return this.prismaClient.clients.create({
      data,
    });
  }
}
