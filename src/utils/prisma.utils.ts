import { PrismaClient, Prisma } from '@prisma/client'

const config: Prisma.PrismaClientOptions = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
}

class SingletonPrisma {
  private _constructor () { }
  private static instance: PrismaClient;
  public static getInstance (): PrismaClient {
    if (!SingletonPrisma.instance) {
      SingletonPrisma.instance = new PrismaClient(config);
    }

    return SingletonPrisma.instance;
  }
}

const db = SingletonPrisma.getInstance();

export default db
