import { PrismaRepository } from "../../../../shared/database/repositories/prisma";
import { Client } from "../../entities/client";
import { ClientRepository } from "../client";

export class PrismaClientRepository
  extends PrismaRepository
  implements ClientRepository
{
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
