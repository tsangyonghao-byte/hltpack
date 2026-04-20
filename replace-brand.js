const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const news = await prisma.news.findMany();
  let updatedCount = 0;

  for (const item of news) {
    const newTitle = item.title.replace(/Logos\s*Packaging/gi, 'HAILITONG Packaging').replace(/Logospack/gi, 'HAILITONG').replace(/Logos/gi, 'HAILITONG');
    const newSummary = item.summary.replace(/Logos\s*Packaging/gi, 'HAILITONG Packaging').replace(/Logospack/gi, 'HAILITONG').replace(/Logos/gi, 'HAILITONG');
    const newCategory = item.category.replace(/Logos/gi, 'HAILITONG');
    const newContent = item.content.replace(/Logos\s*Packaging/gi, 'HAILITONG Packaging').replace(/Logospack/gi, 'HAILITONG').replace(/Logos/gi, 'HAILITONG');

    if (
      newTitle !== item.title || 
      newSummary !== item.summary || 
      newCategory !== item.category || 
      newContent !== item.content
    ) {
      await prisma.news.update({
        where: { id: item.id },
        data: {
          title: newTitle,
          summary: newSummary,
          category: newCategory,
          content: newContent
        }
      });
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} news items replacing "Logos" with "HAILITONG".`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
