import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma";

export abstract class PrismaRepository {
  protected prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }
}
