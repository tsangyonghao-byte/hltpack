const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Loading database state file...');
  const stateFilePath = path.join(__dirname, 'db-state.json');
  if (!fs.existsSync(stateFilePath)) {
    console.error(`Error: Cannot find db-state.json at ${stateFilePath}`);
    process.exit(1);
  }
  
  const data = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
  console.log('Successfully loaded database state.');

  const localCategoryIds = data.categories.map(c => c.id);
  const localProductIds = data.products.map(p => p.id);
  const localNewsIds = data.news.map(n => n.id);
  const localBannerIds = data.banners.map(b => b.id);
  const localSettingIds = data.settings.map(s => s.id);
  const localCertificateIds = data.certificates.map(c => c.id);
  const localLinkIds = data.links.map(l => l.id);
  const localAdminUsernames = data.admins.map(a => a.username);
  const localNavIds = data.navItems.map(n => n.id);

  console.log('\n--- 1. CLEANING OLD RECORDS ON SERVER ---');

  // Deleting child navigation items first
  const existingNavs = await prisma.navigationItem.findMany();
  const navsToDelete = existingNavs.filter(n => !localNavIds.includes(n.id));
  const childNavsToDelete = navsToDelete.filter(n => n.parentId);
  const parentNavsToDelete = navsToDelete.filter(n => !n.parentId);

  if (childNavsToDelete.length > 0) {
    console.log(`Deleting ${childNavsToDelete.length} obsolete child navigation items...`);
    await prisma.navigationItem.deleteMany({
      where: { id: { in: childNavsToDelete.map(n => n.id) } }
    });
  }

  if (parentNavsToDelete.length > 0) {
    console.log(`Deleting ${parentNavsToDelete.length} obsolete parent navigation items...`);
    await prisma.navigationItem.deleteMany({
      where: { id: { in: parentNavsToDelete.map(n => n.id) } }
    });
  }

  // Delete products not in local
  const deletedProducts = await prisma.product.deleteMany({
    where: { id: { notIn: localProductIds } }
  });
  console.log(`Deleted ${deletedProducts.count} obsolete products.`);

  // Delete categories not in local
  const deletedCategories = await prisma.category.deleteMany({
    where: { id: { notIn: localCategoryIds } }
  });
  console.log(`Deleted ${deletedCategories.count} obsolete categories.`);

  // Delete news not in local
  const deletedNews = await prisma.news.deleteMany({
    where: { id: { notIn: localNewsIds } }
  });
  console.log(`Deleted ${deletedNews.count} obsolete news.`);

  // Delete banners not in local
  const deletedBanners = await prisma.banner.deleteMany({
    where: { id: { notIn: localBannerIds } }
  });
  console.log(`Deleted ${deletedBanners.count} obsolete banners.`);

  // Delete settings not in local
  const deletedSettings = await prisma.systemSetting.deleteMany({
    where: { id: { notIn: localSettingIds } }
  });
  console.log(`Deleted ${deletedSettings.count} obsolete settings.`);

  // Delete certificates not in local
  const deletedCertificates = await prisma.certificate.deleteMany({
    where: { id: { notIn: localCertificateIds } }
  });
  console.log(`Deleted ${deletedCertificates.count} obsolete certificates.`);

  // Delete links not in local
  const deletedLinks = await prisma.friendLink.deleteMany({
    where: { id: { notIn: localLinkIds } }
  });
  console.log(`Deleted ${deletedLinks.count} obsolete links.`);

  // Delete admins not in local
  const deletedAdmins = await prisma.adminUser.deleteMany({
    where: { username: { notIn: localAdminUsernames } }
  });
  console.log(`Deleted ${deletedAdmins.count} obsolete admin users.`);

  console.log('\n--- 2. UPSERTING CURRENT RECORDS ---');

  // Upsert Categories
  console.log(`Upserting ${data.categories.length} categories...`);
  for (const item of data.categories) {
    await prisma.category.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  // Upsert Products
  console.log(`Upserting ${data.products.length} products...`);
  for (const item of data.products) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  // Upsert News
  console.log(`Upserting ${data.news.length} news...`);
  for (const item of data.news) {
    await prisma.news.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  // Upsert Banners
  console.log(`Upserting ${data.banners.length} banners...`);
  for (const item of data.banners) {
    await prisma.banner.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  // Upsert Settings
  console.log(`Upserting ${data.settings.length} settings...`);
  for (const item of data.settings) {
    await prisma.systemSetting.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  // Upsert Certificates
  console.log(`Upserting ${data.certificates.length} certificates...`);
  for (const item of data.certificates) {
    await prisma.certificate.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  // Upsert FriendLinks
  console.log(`Upserting ${data.links.length} friend links...`);
  for (const item of data.links) {
    await prisma.friendLink.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  // Upsert AdminUsers
  console.log(`Upserting ${data.admins.length} admin users...`);
  for (const item of data.admins) {
    await prisma.adminUser.upsert({
      where: { username: item.username },
      update: item,
      create: item
    });
  }

  // Upsert NavigationItems (parents first, then children)
  const parents = data.navItems.filter(item => !item.parentId);
  const children = data.navItems.filter(item => item.parentId);

  console.log(`Upserting ${parents.length} parent navigation items...`);
  for (const item of parents) {
    await prisma.navigationItem.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  console.log(`Upserting ${children.length} child navigation items...`);
  for (const item of children) {
    await prisma.navigationItem.upsert({
      where: { id: item.id },
      update: item,
      create: item
    });
  }

  console.log('\nDatabase sync complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
