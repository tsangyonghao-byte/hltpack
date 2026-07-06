const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Fetching database tables...');
  
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  const news = await prisma.news.findMany();
  const banners = await prisma.banner.findMany();
  const settings = await prisma.systemSetting.findMany();
  const certificates = await prisma.certificate.findMany();
  const links = await prisma.friendLink.findMany();
  const admins = await prisma.adminUser.findMany();
  const navItems = await prisma.navigationItem.findMany();

  const state = {
    categories,
    products,
    news,
    banners,
    settings,
    certificates,
    links,
    admins,
    navItems
  };

  const stateFilePath = path.join(__dirname, 'db-state.json');
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2), 'utf-8');
  console.log(`Database state successfully exported to ${stateFilePath}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
