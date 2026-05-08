import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEST_DIR = 'F:\\22-wechatkaifa\\hltpack\\public\\products';

async function main() {
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

  let movedCount = 0;

  for (const product of filmProducts) {
    if (!product.image) continue;

    // The cleanSlug was used as the prefix for flat files in the previous step
    let cleanSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // 1. Create a dedicated folder for this product
    const productFolder = path.join(DEST_DIR, cleanSlug);
    if (!fs.existsSync(productFolder)) {
      fs.mkdirSync(productFolder, { recursive: true });
    }

    // 2. Find all flat files in DEST_DIR that start with this slug
    const allFiles = fs.readdirSync(DEST_DIR).filter(f => fs.statSync(path.join(DEST_DIR, f)).isFile());
    const productFiles = allFiles.filter(f => f.startsWith(`${cleanSlug}-`));

    if (productFiles.length > 0) {
      let mainImage = '';
      let galleryImages = [];

      productFiles.forEach((file, index) => {
        // Move the file into the new folder and rename it simply to 1.jpg, 2.jpg...
        const oldPath = path.join(DEST_DIR, file);
        const ext = path.extname(file);
        const newFileName = `${index + 1}${ext}`; // e.g. 1.jpg
        const newPath = path.join(productFolder, newFileName);
        
        fs.renameSync(oldPath, newPath);

        // Calculate the new relative URL for DB
        const relativeUrl = `/products/${cleanSlug}/${newFileName}`;
        
        // The first one is the main image
        if (index === 0) {
          mainImage = relativeUrl;
        }
        galleryImages.push(relativeUrl);
      });

      // 3. Update the database to point to the new folder structure
      await prisma.product.update({
        where: { id: product.id },
        data: {
          image: mainImage,
          gallery: JSON.stringify(galleryImages)
        }
      });

      movedCount++;
      console.log(`📁 Moved and updated: [${cleanSlug}] -> ${productFiles.length} images`);
    }
  }

  console.log(`\nSuccessfully reorganized ${movedCount} products into dedicated folders.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());