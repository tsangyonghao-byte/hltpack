const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('target.html', 'utf8');
const $ = cheerio.load(html);
console.log($('.news_wrapper .cell').first().html());