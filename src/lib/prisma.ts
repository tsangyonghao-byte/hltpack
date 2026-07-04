import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { cache } from 'react';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
type PrismaD1Input = ConstructorParameters<typeof PrismaD1>[0];

function createPrismaClient() {
  if (process.env.DATABASE_URL) {
    return new PrismaClient();
  }

  const { env } = getCloudflareContext();
  const d1 = (env as { DB?: unknown }).DB;
  if (!d1) {
    return new PrismaClient();
  }

  return new PrismaClient({ adapter: new PrismaD1(d1 as PrismaD1Input) });
}

export const getPrisma = cache(() => {
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma ||= createPrismaClient();
    return globalForPrisma.prisma;
  }

  return createPrismaClient();
});

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getPrisma(), prop, receiver);
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma ||= getPrisma();

export default prisma;
