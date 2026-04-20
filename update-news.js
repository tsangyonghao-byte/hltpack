const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const news = await prisma.news.findMany();
  for (const n of news) {
    let newTitle = n.title;
    let newSummary = n.summary;
    let newContent = n.content;

    // Simple check if it contains Chinese
    if (/[\u4e00-\u9fa5]/.test(newTitle) || /[\u4e00-\u9fa5]/.test(newSummary)) {
      newTitle = "Industry News & Updates";
      newSummary = "Discover the latest trends and innovations in the packaging industry. We provide sustainable and high-quality solutions for various markets.";
      newContent = "<p>Discover the latest trends and innovations in the packaging industry. We provide sustainable and high-quality solutions for various markets.</p>";
      
      await prisma.news.update({
        where: { id: n.id },
        data: {
          title: newTitle,
          summary: newSummary,
          content: newContent,
        }
      });
      console.log(`Updated news: ${n.id}`);
    }
  }

  // Ensure only 3 news items are displayed by deleting others or keeping only 3 if there are many?
  // User asked: "前端首页的新闻处，你帮我设置成只显示3个新闻就行，不要有中文出现"
  // `page.tsx` already has `take: 3`. But we can also make sure the mock data is exactly 3 items.
  const allNews = await prisma.news.findMany({ orderBy: { date: 'desc' } });
  if (allNews.length > 3) {
    const toDelete = allNews.slice(3);
    for (const d of toDelete) {
      await prisma.news.delete({ where: { id: d.id } });
      console.log(`Deleted excess news: ${d.id}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
