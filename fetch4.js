const fs = require('fs');
const html = fs.readFileSync('target.html', 'utf8');
const headerMatch = html.indexOf('<header');
const bannerMatch = html.indexOf('class="banner');
console.log('Header:', headerMatch);
console.log('Banner:', bannerMatch);
