import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("1. Updating product content to include gallery images...");
  
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

  let updatedCount = 0;

  for (const product of filmProducts) {
    if (!product.content || !product.gallery) continue;
    
    let galleryImages = [];
    try {
      galleryImages = JSON.parse(product.gallery);
    } catch(e) {
      continue;
    }

    // Only append if there are images and they haven't been appended yet
    if (galleryImages.length > 0 && !product.content.includes('class="product-detail-images"')) {
      let imageHtml = `\n\n<div class="product-detail-images" style="margin-top: 40px; display: flex; flex-direction: column; gap: 20px;">\n  <h3 style="margin-bottom: 20px; font-size: 24px; font-weight: bold;">Product Gallery</h3>\n`;
      
      for (const imgUrl of galleryImages) {
        imageHtml += `  <img src="${imgUrl}" alt="${product.name}" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />\n`;
      }
      
      imageHtml += `</div>`;

      const newContent = product.content + imageHtml;

      await prisma.product.update({
        where: { id: product.id },
        data: { content: newContent }
      });
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} product contents with gallery images.`);

  console.log("\n2. Checking existing NavigationItems...");
  const navItems = await prisma.navigationItem.findMany({
    orderBy: { order: 'asc' }
  });
  
  console.log("Current Nav Items:");
  navItems.forEach(item => {
    console.log(`- ID: ${item.id} | Name: ${item.nameEn} | Link: ${item.link} | Parent: ${item.parentId}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());