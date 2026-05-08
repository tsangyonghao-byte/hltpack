import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SRC_DIR = 'F:\\22-wechatkaifa\\hltpack\\public\\www.gdcailong.com';
const DEST_DIR = 'F:\\22-wechatkaifa\\hltpack\\public\\products';

// Helper to ensure dest dir exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Function to find the best matching folder
function findMatchingFolder(folders, chineseName) {
  // Normalize the search string
  const searchStr = chineseName.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
  
  let bestMatch = null;
  let maxScore = 0;

  for (const folder of folders) {
    const normalizedFolder = folder.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
    
    // Check if folder contains the exact string or vice versa
    if (normalizedFolder.includes(searchStr) || searchStr.includes(normalizedFolder)) {
      return folder;
    }

    // Rough similarity score based on common characters
    let score = 0;
    for (let i = 0; i < searchStr.length; i++) {
      if (normalizedFolder.includes(searchStr[i])) {
        score++;
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = folder;
    }
  }

  // Threshold to avoid false positives
  if (maxScore >= 4) {
    return bestMatch;
  }
  return null;
}

// Manual overrides for tricky folder names
const MANUAL_MAP = {
  "高阻隔镀铝纸": "镀铝纸.高阻隔镀铝纸,环保包装材料,可降解环保膜"
};

async function main() {
  const folders = fs.readdirSync(SRC_DIR).filter(f => fs.statSync(path.join(SRC_DIR, f)).isDirectory());
  console.log(`Found ${folders.length} folders in source directory.`);

  // Get all film products from DB
  const filmProducts = await prisma.product.findMany({
    where: {
      category: {
        name: { in: [
          "Transparent High-Barrier Films (AlOx)",
          "Metallized Films (VMPET/VMCPP)",
          "Specialty & Functional Films",
          "Recyclable Mono-Materials"
        ]}
      }
    }
  });

  const matchedProductIds = new Set();
  const matchedFolders = new Set();

  for (const product of filmProducts) {
    let featuresArray = [];
    try {
      featuresArray = JSON.parse(product.features);
    } catch (e) {
      continue;
    }

    const chineseName = featuresArray[0] || "";
    if (!chineseName) continue;

    let matchedFolder = MANUAL_MAP[chineseName] || findMatchingFolder(folders, chineseName);

    if (matchedFolder && !matchedFolders.has(matchedFolder)) {
      matchedProductIds.add(product.id);
      matchedFolders.add(matchedFolder);
      
      // We have a match! Now let's copy and rename the images.
      const srcFolderPath = path.join(SRC_DIR, matchedFolder);
      const images = fs.readdirSync(srcFolderPath).filter(f => f.match(/\.(png|jpe?g|gif|webp)$/i));
      
      if (images.length > 0) {
        // Create a clean slug for the product images based on English name
        let cleanSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        let mainImage = '';
        let galleryImages = [];

        images.forEach((img, index) => {
          const ext = path.extname(img);
          const newImageName = `${cleanSlug}-${index + 1}${ext}`;
          const destPath = path.join(DEST_DIR, newImageName);
          
          // Copy file
          fs.copyFileSync(path.join(srcFolderPath, img), destPath);
          
          const relativeUrl = `/products/${newImageName}`;
          if (index === 0) {
            mainImage = relativeUrl; // First image becomes the main cover
          }
          galleryImages.push(relativeUrl);
        });

        // Update database
        await prisma.product.update({
          where: { id: product.id },
          data: {
            image: mainImage,
            gallery: JSON.stringify(galleryImages)
          }
        });
        
        console.log(`✅ MATCHED & UPDATED: [${chineseName}] -> ${cleanSlug}`);
      }
    } else {
      console.log(`❌ NO MATCH FOUND FOR: [${chineseName}]`);
    }
  }

  // Find products that didn't match any folder
  const unmatchedProducts = filmProducts.filter(p => !matchedProductIds.has(p.id));
  
  console.log(`\n--- SUMMARY ---`);
  console.log(`Total Products in DB: ${filmProducts.length}`);
  console.log(`Total Folders Matched: ${matchedFolders.size}`);
  console.log(`Total Missing Products (to be deleted): ${unmatchedProducts.length}`);

  // Delete unmatched products
  for (const up of unmatchedProducts) {
    console.log(`🗑️ DELETING: ${up.name}`);
    await prisma.product.delete({
      where: { id: up.id }
    });
  }

  console.log('Finished syncing images and deleting missing products.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());