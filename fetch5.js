const fs = require('fs');
const html = fs.readFileSync('target.html', 'utf8');
const headerIdx = html.indexOf('</header>');
const bannerIdx = html.indexOf('<div class="banner desk">');
console.log(html.substring(headerIdx + 9, bannerIdx));