import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NEW_CATEGORIES = [
  "High-Barrier & Metallized Films",
  "Transparent High-Barrier Films (AlOx)",
  "Metallized Films (VMPET/VMCPP)",
  "Specialty & Functional Films",
  "Recyclable Mono-Materials"
];

const NEW_PRODUCTS = [
  {
    name: "Transparent High-Barrier AlOx Film",
    categoryName: "Transparent High-Barrier Films (AlOx)",
    image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png", // using an existing generic roll stock image
    features: ["Excellent Oxygen & Moisture Barrier", "High Transparency", "Microwaveable"],
  },
  {
    name: "Premium Metallized PET Film (VMPET)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png",
    features: ["Light Blocking", "Aesthetic Metallic Finish", "Extended Shelf Life"],
  },
  {
    name: "Anti-Static Electronic Packaging Film",
    categoryName: "Specialty & Functional Films",
    image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png",
    features: ["ESD Protection", "Puncture Resistant", "Ideal for Electronics"],
  },
  {
    name: "Mono-PE Recyclable Rollstock",
    categoryName: "Recyclable Mono-Materials",
    image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png",
    features: ["100% Recyclable", "Sustainable", "High Sealing Strength"],
  }
];

async function main() {
  console.log('Adding new film categories and products...');

  // Create Categories
  for (const catName of NEW_CATEGORIES) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName },
    });
  }
  console.log('New categories added.');

  // Create Products
  for (const prod of NEW_PRODUCTS) {
    const category = await prisma.category.findUnique({
      where: { name: prod.categoryName }
    });

    if (category) {
      // Check if product already exists to avoid duplicates during multiple runs
      const existingProduct = await prisma.product.findFirst({
        where: { name: prod.name }
      });

      if (!existingProduct) {
         await prisma.product.create({
          data: {
            name: prod.name,
            categoryId: category.id,
            image: prod.image,
            features: JSON.stringify(prod.features),
            isFeatured: true,
          }
        });
      }
    }
  }
  console.log('New products added.');
  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });