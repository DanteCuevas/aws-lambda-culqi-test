import { PrismaClient, Prisma } from '@prisma/client'

const url = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL
const config: Prisma.PrismaClientOptions = {
  datasources: {
    db: {
      url
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
