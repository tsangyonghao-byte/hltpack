const fs = require('fs');

const html = fs.readFileSync('target.html', 'utf8');
const lines = html.split('\n');

for(let i=0; i<lines.length; i++) {
   if (lines[i].includes('Slider') || lines[i].includes('banner')) {
       // print nearby lines to find how they initialize the banner
       console.log(`\n--- Line ${i} ---`);
       console.log(lines.slice(Math.max(0, i-2), i+15).join('\n'));
   }
}
