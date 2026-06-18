const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(__dirname, '..', 'db-state.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: Cannot find db-state.json at ${jsonPath}`);
    process.exit(1);
  }

  console.log('Reading db-state.json...');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log('Importing database tables (preserving Message and MessageActivityLog)...');

  await prisma.$transaction(async (tx) => {
    // 1. Delete dependent tables first
    console.log('Clearing old product and category records...');
    await tx.product.deleteMany();
    await tx.category.deleteMany();

    console.log('Clearing old system settings, news, banners, certificates, friend links, and navigation items...');
    await tx.systemSetting.deleteMany();
    await tx.news.deleteMany();
    await tx.banner.deleteMany();
    await tx.certificate.deleteMany();
    await tx.friendLink.deleteMany();
    // NavigationItem uses recursive parentId relations, so delete all records to clear them safely
    await tx.navigationItem.deleteMany();

    // 2. Insert Categories
    console.log(`Inserting ${data.categories.length} categories...`);
    for (const item of data.categories) {
      await tx.category.create({ data: item });
    }

    // 3. Insert Products
    console.log(`Inserting ${data.products.length} products...`);
    for (const item of data.products) {
      await tx.product.create({ data: item });
    }

    // 4. Insert News
    console.log(`Inserting ${data.news.length} news articles...`);
    for (const item of data.news) {
      await tx.news.create({ data: item });
    }

    // 5. Insert Banners
    console.log(`Inserting ${data.banners.length} banners...`);
    for (const item of data.banners) {
      await tx.banner.create({ data: item });
    }

    // 6. Insert System Settings
    console.log(`Inserting ${data.settings.length} system settings...`);
    for (const item of data.settings) {
      await tx.systemSetting.create({ data: item });
    }

    // 7. Insert Certificates
    console.log(`Inserting ${data.certificates.length} certificates...`);
    for (const item of data.certificates) {
      await tx.certificate.create({ data: item });
    }

    // 8. Insert Friend Links
    console.log(`Inserting ${data.links.length} friend links...`);
    for (const item of data.links) {
      await tx.friendLink.create({ data: item });
    }

    // 9. Insert NavigationItems (hierarchical insertion: parents first, then children)
    console.log(`Inserting ${data.navItems.length} navigation items...`);
    // Filter parent items (where parentId is null)
    const parents = data.navItems.filter(item => !item.parentId);
    const children = data.navItems.filter(item => item.parentId);

    for (const parent of parents) {
      await tx.navigationItem.create({ data: parent });
    }
    for (const child of children) {
      await tx.navigationItem.create({ data: child });
    }

    // 10. Update Admin users if present in file
    if (data.admins && data.admins.length > 0) {
      console.log(`Syncing ${data.admins.length} admin users...`);
      await tx.adminUser.deleteMany();
      for (const admin of data.admins) {
        await tx.adminUser.create({ data: admin });
      }
    }
  });

  console.log('🎉 Database successfully imported without affecting visitor inquiries!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
