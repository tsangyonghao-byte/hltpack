const fs = require('fs');
const html = fs.readFileSync('target.html', 'utf8');

const regex = /<div class="whatsapp_container">([\s\S]*?)<\/div>\s*<\/div>/;
const match = regex.exec(html);
if (match) {
    console.log(match[0]);
}

const regex2 = /<div class="backtoTop_container">([\s\S]*?)<\/div>/;
const match2 = regex2.exec(html);
if (match2) {
    console.log(match2[0]);
}
