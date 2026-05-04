const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const { getPreferredImage } = require('./productImageUtils.cjs');

const prisma = new PrismaClient();

// A simple dictionary for product names since we don't have a real translation API hooked up
function translateTitle(zhTitle, category) {
  if (zhTitle.includes('狗粮') || zhTitle.includes('猫粮')) return 'Premium Pet Food Packaging Pouch';
  if (zhTitle.includes('宠物')) return 'Custom Pet Supplies Packaging Bag';
  if (zhTitle.includes('茶')) return 'High Barrier Tea Packaging Pouch';
  if (zhTitle.includes('面膜')) return 'Cosmetic Facial Mask Packaging Bag';
  if (zhTitle.includes('玩具')) return 'Custom Toy Packaging Bag';
  if (zhTitle.includes('自封')) return 'Resealable Ziplock Packaging Pouch';
  if (zhTitle.includes('吸嘴')) return 'Liquid Spout Pouch Packaging';
  if (zhTitle.includes('牛皮')) return 'Eco-Friendly Kraft Paper Pouch';
  if (zhTitle.includes('阴阳')) return 'Foil-Clear Front Packaging Bag';
  if (zhTitle.includes('口罩')) return 'Medical Mask Packaging Bag';
  if (zhTitle.includes('大米')) return 'Heavy Duty Rice Packaging Bag';
  if (zhTitle.includes('咖啡')) return 'Coffee Bean Packaging Pouch with Valve';
  if (zhTitle.includes('冷冻')) return 'Frozen Food Packaging Bag';
  if (zhTitle.includes('干果') || zhTitle.includes('坚果')) return 'Nuts & Dried Fruit Packaging Pouch';
  
  return `Custom Printed ${category.replace('Bags', 'Bag').replace('Pouches', 'Pouch')}`;
}

async function run() {
  console.log('Reading scraped_products.json...');
  if (!fs.existsSync('scraped_products.json')) {
    console.log('JSON file not found. Waiting for scraper to finish...');
    return;
  }
  
  const products = JSON.parse(fs.readFileSync('scraped_products.json', 'utf8'));
  console.log(`Loaded ${products.length} products to import.`);
  
  console.log('Cleaning up old products from database...');
  await prisma.product.deleteMany({});
  
  console.log('Fetching available categories from database...');
  const navItems = await prisma.navigationItem.findMany({
    where: { link: { contains: '/products?category=' } }
  });
  
  // We need Category records, but we might only have NavigationItem records. Let's make sure Categories exist
  const existingCategories = await prisma.category.findMany();
  const categoryMap = {}; // nameEn -> category.id
  
  for (const nav of navItems) {
    let cat = existingCategories.find(c => c.name === nav.nameEn);
    if (!cat) {
      cat = await prisma.category.create({
        data: { name: nav.nameEn, description: nav.nameZh }
      });
      existingCategories.push(cat);
    }
    categoryMap[nav.nameEn] = cat.id;
  }

  let importedCount = 0;

  for (const p of products) {
    // Determine target category
    const catName = p.suggestedCategory;
    const categoryId = categoryMap[catName];
    
    if (!categoryId) {
      console.log(`Skipping product (no category match): ${p.titleZh} -> ${catName}`);
      continue;
    }

    const enTitle = translateTitle(p.titleZh, catName);
    const slug = enTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substr(2, 5);
    
    const allImages = [p.mainImg, ...(Array.isArray(p.gallery) ? p.gallery : [])].filter(Boolean);
    const mainImage = await getPreferredImage(allImages) || p.mainImg || p.gallery?.[0] || '/images/placeholder.jpg';

    // Convert gallery array to JSON string for Prisma
    const galleryJson = p.gallery.length > 0 ? JSON.stringify(p.gallery) : "[]";
    
    const introText = `<p><strong>${enTitle}</strong> manufactured by HAILITONG Packaging. We offer high-quality, custom-printed flexible packaging solutions tailored to your brand's needs.</p>`;
    const fullContent = introText + (p.contentHtml || '');

    try {
      await prisma.product.create({
        data: {
          name: enTitle, // Using correct Prisma field name
          slug: slug,
          seoTitle: `${enTitle} | HAILITONG Packaging`,
          seoDescription: `High quality ${enTitle.toLowerCase()} customized for your brand.`,
          categoryId: categoryId,
          image: mainImage,
          gallery: galleryJson,
          features: "[]",
          content: fullContent,
          isFeatured: importedCount < 8 // Make first 8 featured for homepage
        }
      });
      importedCount++;
      console.log(`Imported [${importedCount}]: ${enTitle}`);
    } catch (e) {
      console.error(`Failed to import ${enTitle}:`, e.message);
    }
  }

  console.log(`\n✅ Successfully imported ${importedCount} products into the database!`);
}

run().catch(console.error).finally(()=>prisma.$disconnect());
