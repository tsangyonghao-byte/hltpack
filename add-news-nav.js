const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Add News to main navigation
  const existingNewsNav = await prisma.navigationItem.findFirst({
    where: { link: '/news' }
  });

  if (!existingNewsNav) {
    const newsNav = await prisma.navigationItem.create({
      data: {
        nameZh: '新闻中心',
        nameEn: 'News',
        link: '/news',
        order: 65, // between Sustainability (60) and Contact (70)
        isVisible: true
      }
    });

    // Add sub-navigation items based on categories
    const categories = [
      { nameZh: '包装新闻', nameEn: 'Packaging News', link: '/news?category=Packaging+News', order: 1 },
      { nameZh: '展会动态', nameEn: 'Exhibition', link: '/news?category=Exhibition', order: 2 },
      { nameZh: '海力通发展', nameEn: 'HAILITONG Development', link: '/news?category=HAILITONG+Development', order: 3 },
      { nameZh: '视频', nameEn: 'Video', link: '/news?category=Video', order: 4 }
    ];

    for (const cat of categories) {
      await prisma.navigationItem.create({
        data: {
          ...cat,
          parentId: newsNav.id,
          isVisible: true
        }
      });
    }
    console.log("Added News navigation to the database.");
  } else {
    console.log("News navigation already exists.");
  }
}

main().finally(() => prisma.$disconnect());