const fs = require('fs');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const html = fs.readFileSync('target.html', 'utf8');
  const $ = cheerio.load(html);
  
  const newsList = [];
  // Target website uses `.news_wrapper .cell`
  $('.news_wrapper .cell').each((i, el) => {
    const title = $(el).find('.cell_title').text().trim();
    let desc = $(el).find('.cell_des').text().trim();
    // remove trailing ... if any
    desc = desc.replace(/\s*\.\.\.$/, '');
    
    let img = $(el).find('img').attr('src');
    if (img && !img.startsWith('http')) {
      img = 'https://www.logospack.com.hk' + img;
    }
    
    const date = $(el).find('.date').text().trim();
    let cat = $(el).find('.tag_cell').text().trim();
    if (cat.startsWith('#')) {
      cat = cat.substring(1);
    }
    
    if (title && !newsList.find(n => n.title === title)) {
      newsList.push({ title, summary: desc, image: img, date, category: cat || 'News' });
    }
  });

  console.log(`Found ${newsList.length} unique news items.`);

  await prisma.news.deleteMany();
  for (const item of newsList) {
    await prisma.news.create({
      data: {
        title: item.title,
        summary: item.summary,
        image: item.image,
        date: item.date,
        category: item.category,
        content: `<p>${item.summary}</p>`,
      }
    });
  }
  
  console.log("News seeding complete!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
