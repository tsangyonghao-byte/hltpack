import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { cache } from 'react';

const globalForPrisma = global as unknown as { prisma?: PrismaClient; prismaD1?: PrismaClient };
type PrismaD1Input = ConstructorParameters<typeof PrismaD1>[0];
type WorkersEnvModule = { env?: { DB?: unknown } };

function createLocalPrismaClient() {
  globalForPrisma.prisma ||= new PrismaClient();
  return globalForPrisma.prisma;
}

async function getD1Binding() {
  try {
    const { env } = getCloudflareContext();
    const d1 = (env as { DB?: unknown }).DB;
    if (d1) return d1;
  } catch {
    // The sync context is only available during some Cloudflare request paths.
  }

  try {
    const runtimeImport = new Function('specifier', 'return import(specifier)') as (
      specifier: string,
    ) => Promise<WorkersEnvModule>;
    const workers = await runtimeImport('cloudflare:workers');
    if (workers.env?.DB) return workers.env.DB;
  } catch {
    // This module only exists in the Cloudflare Workers runtime.
  }

  return null;
}

async function createPrismaClient() {
  if (process.env.NODE_ENV === 'development' && process.env.DATABASE_URL) {
    return createLocalPrismaClient();
  }

  if (globalForPrisma.prismaD1) {
    return globalForPrisma.prismaD1;
  }

  const d1 = await getD1Binding();
  if (d1) {
    globalForPrisma.prismaD1 = new PrismaClient({ adapter: new PrismaD1(d1 as PrismaD1Input) });
    return globalForPrisma.prismaD1;
  }

  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    try {
      const { env } = await getCloudflareContext({ async: true });
      const asyncD1 = (env as { DB?: unknown }).DB;
      if (asyncD1) {
        globalForPrisma.prismaD1 = new PrismaClient({ adapter: new PrismaD1(asyncD1 as PrismaD1Input) });
        return globalForPrisma.prismaD1;
      }
    } catch {
      // getCloudflareContext is only available in the Cloudflare runtime.
    }
  }

  if (process.env.DATABASE_URL) {
    return createLocalPrismaClient();
  }

  return createLocalPrismaClient();
}

export const getPrisma = cache(async () => createPrismaClient());

function createDelegateProxy(prop: string | symbol) {
  return new Proxy(
    {},
    {
      get(_target, method) {
        return async (...args: unknown[]) => {
          const client = await getPrisma();
          const delegate = Reflect.get(client, prop);
          try {
            return await Reflect.get(delegate, method).apply(delegate, args);
          } catch (error) {
            console.error(`Prisma query failed: ${String(prop)}.${String(method)}`, error);
            throw error;
          }
        };
      },
    },
  );
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (typeof prop === 'symbol') {
      return Reflect.get(createLocalPrismaClient(), prop);
    }

    if (prop.startsWith('$')) {
      return async (...args: unknown[]) => {
        const client = await getPrisma();
        return Reflect.get(client, prop).apply(client, args);
      };
    }

    return createDelegateProxy(prop);
  },
});

export default prisma;
