import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Updating Navigation items with images...");

  const updates = [
    {
      nameEn: "High-Barrier & Metallized Films",
      image: "/products/metallized-films-vmpet-vmcpp/high-gloss-metallized-pet-film-vmpet-gl/1.jpeg"
    },
    {
      nameEn: "Transparent High-Barrier Films (AlOx)",
      image: "/products/transparent-high-barrier-films-alox/transparent-high-barrier-pet-alox-film-boilable-pet-alox-010/1.png"
    },
    {
      nameEn: "Metallized Films (VMPET/VMCPP)",
      image: "/products/metallized-films-vmpet-vmcpp/high-gloss-metallized-pet-film-vmpet-gl/1.png"
    },
    {
      nameEn: "Specialty & Functional Films",
      image: "/products/specialty-functional-films/matte-pet-film-pet/1.png"
    },
    {
      nameEn: "Recyclable Mono-Materials",
      image: "/products/recyclable-mono-materials/mono-pe-recyclable-rollstock/1.png"
    }
  ];

  // We should double check actual file extensions that exist.
  // We can just pick the first product of each category to be completely dynamic.

  const categories = [
    { navName: "Transparent High-Barrier Films (AlOx)", catName: "Transparent High-Barrier Films (AlOx)" },
    { navName: "Metallized Films (VMPET/VMCPP)", catName: "Metallized Films (VMPET/VMCPP)" },
    { navName: "Specialty & Functional Films", catName: "Specialty & Functional Films" },
    { navName: "Recyclable Mono-Materials", catName: "Recyclable Mono-Materials" },
  ];

  for (const map of categories) {
    // Find one product in this category
    const prod = await prisma.product.findFirst({
      where: { category: { name: map.catName } },
      select: { image: true }
    });

    if (prod && prod.image) {
      // Update the navigation item
      const navItem = await prisma.navigationItem.findFirst({
        where: { nameEn: map.navName }
      });

      if (navItem) {
        await prisma.navigationItem.update({
          where: { id: navItem.id },
          data: { image: prod.image }
        });
        console.log(`Updated Nav [${map.navName}] with image: ${prod.image}`);
      }
    }
  }

  // Also update the parent item to have a default image
  const parentNav = await prisma.navigationItem.findFirst({
    where: { nameEn: "High-Barrier & Metallized Films" }
  });

  const someProd = await prisma.product.findFirst({
    where: { category: { name: "Metallized Films (VMPET/VMCPP)" } },
    select: { image: true }
  });

  if (parentNav && someProd && someProd.image) {
    await prisma.navigationItem.update({
      where: { id: parentNav.id },
      data: { image: someProd.image }
    });
    console.log(`Updated Parent Nav [High-Barrier & Metallized Films] with image: ${someProd.image}`);
  }

  console.log("Done updating navigation images.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());