const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { getPreferredImage } = require('./productImageUtils.cjs');

const prisma = new PrismaClient();
const productsDir = path.join(__dirname, 'public', 'products');

// Translation helper
function translateTitle(zhTitle, categoryZh) {
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
  if (zhTitle.includes('气泡')) return 'Bubble Wrap Packaging Bag';
  if (zhTitle.includes('异型') || zhTitle.includes('异性')) return 'Custom Shaped Packaging Bag';
  if (zhTitle.includes('收缩标签') || categoryZh.includes('收缩标签')) return 'Heat Shrink Sleeve Label';
  if (zhTitle.includes('卷膜') || categoryZh.includes('卷膜')) return 'Printed Roll Stock Film';
  if (zhTitle.includes('食品')) return 'Custom Food Packaging Bag';
  
  return `Custom Printed Packaging Bag`;
}

// English Category Map based on Chinese SubCategory
const catMap = {
  '口罩袋': 'Medical Packaging Bags',
  '吸嘴袋': 'Spout Pouches',
  '定制宠物用品袋': 'Custom Pet Supplies Bags',
  '定制食品袋': 'Custom Food Bags',
  '异性袋': 'Custom Shaped Bags',
  '异型袋': 'Custom Shaped Bags',
  '气泡袋': 'Bubble Mailers',
  '牛皮纸袋': 'Kraft Paper Bags',
  '玩具袋': 'Toy Bags',
  '自封袋': 'Ziplock Bags',
  '茶叶袋': 'Tea Bags',
  '阴阳袋': 'Foil-Clear Bags',
  '面膜袋': 'Facial Mask Bags',
  '收缩标签系列': 'Shrink Label Series',
  '卷膜系列': 'Roll Film Series',
  '塑料包装袋系列': 'Plastic Packaging Bags'
};

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

async function run() {
  console.log('Starting local images sync...');
  
  // 1. Fetch all DB categories to map IDs
  const dbCategories = await prisma.category.findMany();
  const dbCatMap = {};
  for (const c of dbCategories) {
    dbCatMap[c.name] = c.id;
  }
  
  // Clean old products
  console.log('Cleaning old products...');
  await prisma.product.deleteMany({});
  
  // 3. Analyze local folders
  // public/products/Major/Sub/Product/images
  // public/products/Major/Product/images
  const majorDirs = fs.readdirSync(productsDir).filter(f => fs.statSync(path.join(productsDir, f)).isDirectory());
  
  let totalProcessed = 0;

  for (const major of majorDirs) {
    const majorPath = path.join(productsDir, major);
    const subDirs = fs.readdirSync(majorPath).filter(f => fs.statSync(path.join(majorPath, f)).isDirectory());
    
    for (const subOrProd of subDirs) {
      const subPath = path.join(majorPath, subOrProd);
      const innerDirs = fs.readdirSync(subPath).filter(f => fs.statSync(path.join(subPath, f)).isDirectory());
      
      // If innerDirs is empty, subOrProd is the Product Name
      if (innerDirs.length === 0) {
        await processProduct(subOrProd, subPath, major, major);
      } else {
        // subOrProd is SubCategory
        for (const prod of innerDirs) {
          const prodPath = path.join(subPath, prod);
          await processProduct(prod, prodPath, subOrProd, major);
        }
      }
    }
  }

  async function processProduct(prodNameZh, prodPath, subCatZh, majorCatZh) {
    const images = getFilesRecursively(prodPath);
    if (images.length === 0) return;
    
    images.sort(); // 10001 first
    
    const webImages = images.map(img => {
      return img.replace(__dirname, '').replace(/\\/g, '/').replace('/public', '');
    });
    
    const mainImg = await getPreferredImage(webImages, { baseDir: __dirname }) || webImages[0];
    const galleryJson = JSON.stringify(webImages);
    
    const catEn = catMap[subCatZh] || catMap[majorCatZh] || 'Plastic Packaging Bags';
    let categoryId = dbCatMap[catEn];
    
    if (!categoryId) {
      // fallback
      categoryId = dbCategories[0].id;
    }
    
    const enTitle = translateTitle(prodNameZh, subCatZh);
    const slug = enTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substr(2, 5);
    
    const introText = `<p><strong>${enTitle}</strong> manufactured by HAILITONG Packaging. We offer high-quality, custom-printed flexible packaging solutions tailored to your brand's needs.</p>`;
    
    await prisma.product.create({
      data: {
        name: enTitle,
        slug: slug,
        seoTitle: `${enTitle} | HAILITONG Packaging`,
        seoDescription: `High quality ${enTitle.toLowerCase()} customized for your brand.`,
        categoryId: categoryId,
        image: mainImg,
        gallery: galleryJson,
        features: "[]",
        content: introText,
        isFeatured: totalProcessed < 8 
      }
    });
    totalProcessed++;
    console.log(`[Created] ${prodNameZh} (${enTitle}) -> ${webImages.length} images -> Category: ${catEn}`);
  }
  
  console.log(`\n✅ Finished syncing local images!`);
  console.log(`Total Products Created: ${totalProcessed}`);
}

run().catch(console.error).finally(()=>prisma.$disconnect());
