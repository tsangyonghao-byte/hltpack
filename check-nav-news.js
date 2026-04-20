const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const nav = await prisma.navigationItem.findMany({ orderBy: { order: 'asc' } });
  console.log('Navigation Items:', nav.map(n => ({ id: n.id, name: n.nameEn, parentId: n.parentId })));
  
  const cats = await prisma.news.groupBy({
    by: ['category'],
    _count: true
  });
  console.log('News Categories:', cats);
}

main().finally(() => prisma.$disconnect());