const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const productsNav = await prisma.navigationItem.findFirst({
    where: { link: '/products' }
  });

  if (!productsNav) {
    console.log("Products navigation not found!");
    return;
  }

  // Define categories and their sub-items with images
  const categories = [
    {
      nameZh: '直立袋', nameEn: 'Stand-up Pouches', link: '/products?category=Stand-up+Pouches', order: 1,
      subs: [
        { nameZh: '直立袋应用', nameEn: 'Stand-up Pouches Applications', link: '/products?category=Stand-up+Pouches', order: 1, image: '/daizi01.png' },
        { nameZh: '定制直立袋', nameEn: 'Custom Stand-up Pouches', link: '/products?category=Stand-up+Pouches', order: 2, image: '/daizi02.png' },
        { nameZh: '环保选项', nameEn: 'Eco-friendly Options', link: '/products?category=Stand-up+Pouches', order: 3, image: '/daizi03.png' },
      ]
    },
    {
      nameZh: '平底袋', nameEn: 'Flat Bottom Pouches', link: '/products?category=Flat+Bottom+Pouches', order: 2,
      subs: [
        { nameZh: '平底袋应用', nameEn: 'Flat Bottom Pouches Applications', link: '/products?category=Flat+Bottom+Pouches', order: 1, image: '/daizi04.png' },
        { nameZh: '定制平底袋', nameEn: 'Custom Flat Bottom Pouches', link: '/products?category=Flat+Bottom+Pouches', order: 2, image: '/daizi05.png' },
        { nameZh: '环保选项', nameEn: 'Eco-friendly Options', link: '/products?category=Flat+Bottom+Pouches', order: 3, image: '/daizi01.png' },
      ]
    },
    {
      nameZh: '蒸煮袋', nameEn: 'Retort Pouches', link: '/products?category=Retort+Pouches', order: 3,
      subs: [
        { nameZh: '蒸煮袋应用', nameEn: 'Retort Pouches Applications', link: '/products?category=Retort+Pouches', order: 1, image: '/daizi02.png' },
        { nameZh: '定制蒸煮袋', nameEn: 'Custom Retort Pouches', link: '/products?category=Retort+Pouches', order: 2, image: '/daizi03.png' },
        { nameZh: '环保选项', nameEn: 'Eco-friendly Options', link: '/products?category=Retort+Pouches', order: 3, image: '/daizi04.png' },
      ]
    }
  ];

  for (const cat of categories) {
    // Check if category exists
    let catNav = await prisma.navigationItem.findFirst({
      where: { parentId: productsNav.id, nameEn: cat.nameEn }
    });

    if (!catNav) {
      catNav = await prisma.navigationItem.create({
        data: {
          nameZh: cat.nameZh,
          nameEn: cat.nameEn,
          link: cat.link,
          order: cat.order,
          parentId: productsNav.id,
          isVisible: true
        }
      });
    }

    // Seed Sub-items (3rd level)
    for (const sub of cat.subs) {
      const subNav = await prisma.navigationItem.findFirst({
        where: { parentId: catNav.id, nameEn: sub.nameEn }
      });

      if (!subNav) {
        await prisma.navigationItem.create({
          data: {
            nameZh: sub.nameZh,
            nameEn: sub.nameEn,
            link: sub.link,
            order: sub.order,
            parentId: catNav.id,
            isVisible: true,
            image: sub.image
          }
        });
      } else {
        await prisma.navigationItem.update({
          where: { id: subNav.id },
          data: { image: sub.image }
        });
      }
    }
  }

  console.log("Seeded 3rd level navigation items with images for Products!");
}

main().finally(() => prisma.$disconnect());