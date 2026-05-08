import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Adding High-Barrier & Metallized Films to Navigation...");

  // 1. Find the parent ID for "Our Products"
  const parentProduct = await prisma.navigationItem.findFirst({
    where: { nameEn: "Our Products" }
  });

  if (!parentProduct) {
    console.error("Could not find parent 'Our Products' navigation item.");
    return;
  }

  // 2. Add the main Film category
  const mainFilmNav = await prisma.navigationItem.create({
    data: {
      nameZh: "高阻隔与金属化薄膜",
      nameEn: "High-Barrier & Metallized Films",
      link: "/products?category=High-Barrier+%26+Metallized+Films",
      order: 100, // Put it after Plastic Bags and Shrink Labels
      parentId: parentProduct.id,
      isVisible: true
    }
  });

  console.log(`Created parent nav: ${mainFilmNav.nameEn}`);

  // 3. Add the 4 subcategories
  const subCategories = [
    {
      nameZh: "透明高阻隔氧化铝系列",
      nameEn: "Transparent High-Barrier Films (AlOx)",
      link: "/products?category=Transparent+High-Barrier+Films+%28AlOx%29"
    },
    {
      nameZh: "金属化薄膜系列",
      nameEn: "Metallized Films (VMPET/VMCPP)",
      link: "/products?category=Metallized+Films+%28VMPET%2FVMCPP%29"
    },
    {
      nameZh: "功能性薄膜系列",
      nameEn: "Specialty & Functional Films",
      link: "/products?category=Specialty+%26+Functional+Films"
    },
    {
      nameZh: "单一材质可回收系列",
      nameEn: "Recyclable Mono-Materials",
      link: "/products?category=Recyclable+Mono-Materials"
    }
  ];

  let order = 1;
  for (const sub of subCategories) {
    await prisma.navigationItem.create({
      data: {
        nameZh: sub.nameZh,
        nameEn: sub.nameEn,
        link: sub.link,
        order: order++,
        parentId: mainFilmNav.id,
        isVisible: true
      }
    });
    console.log(`Created sub nav: ${sub.nameEn}`);
  }

  console.log("\nNavigation setup complete.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());