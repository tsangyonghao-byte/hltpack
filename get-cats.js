const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.news.groupBy({
    by: ['category'],
    _count: true
  });
  console.log(cats);
}

main().finally(() => prisma.$disconnect());