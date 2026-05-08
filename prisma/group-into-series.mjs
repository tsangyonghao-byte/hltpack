import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const BASE_DIR = 'F:\\22-wechatkaifa\\hltpack\\public\\products';

async function main() {
  console.log("Grouping products into their series (category) folders...");

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
    },
    include: { category: true } // Need the category name to create the series folder
  });

  let movedCount = 0;

  for (const product of filmProducts) {
    if (!product.image) continue;

    // Current DB image format: /products/some-product-slug/1.jpeg
    const match = product.image.match(/^\/products\/([^\/]+)\//);
    if (!match) continue;

    const productSlug = match[1];
    
    // Create a clean slug for the series (category)
    const categorySlug = product.category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const currentFolderPath = path.join(BASE_DIR, productSlug);
    const categoryFolderPath = path.join(BASE_DIR, categorySlug);
    const newFolderPath = path.join(categoryFolderPath, productSlug);

    // 1. Create category folder if it doesn't exist
    if (!fs.existsSync(categoryFolderPath)) {
      fs.mkdirSync(categoryFolderPath, { recursive: true });
    }

    // 2. Move the product folder into the category folder
    if (fs.existsSync(currentFolderPath) && !fs.existsSync(newFolderPath)) {
      fs.renameSync(currentFolderPath, newFolderPath);
    }

    // 3. Update DB paths to include the category folder
    if (fs.existsSync(newFolderPath)) {
      const files = fs.readdirSync(newFolderPath).filter(f => fs.statSync(path.join(newFolderPath, f)).isFile());
      
      if (files.length > 0) {
        // Sort files numerically (1.jpeg, 2.jpeg...)
        files.sort((a, b) => parseInt(a) - parseInt(b));
        
        const newImage = `/products/${categorySlug}/${productSlug}/${files[0]}`;
        const newGallery = files.map(f => `/products/${categorySlug}/${productSlug}/${f}`);

        await prisma.product.update({
          where: { id: product.id },
          data: {
            image: newImage,
            gallery: JSON.stringify(newGallery)
          }
        });
        movedCount++;
        console.log(`✅ Moved: [${productSlug}] -> [${categorySlug}/${productSlug}]`);
      }
    }
  }

  console.log(`\nSuccessfully grouped ${movedCount} products into category series folders.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());