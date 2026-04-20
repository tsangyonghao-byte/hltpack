const fs = require('fs');
const html = fs.readFileSync('target.html', 'utf8');

// We need to look closely at how the header and banner are laid out.
// Is the header inside the banner? Or is the banner overlapping the header?
console.log('=== HEADER AND BANNER STRUCTURE ===');
const regex = /<header([^>]*)>[\s\S]*?<\/header>\s*<div[^>]*class=["'][^"']*banner[^"']*["']/i;
const match = regex.exec(html);
if (match) {
  console.log("Header is followed by banner.");
} else {
  console.log("Header and banner structure might be different.");
  
  // let's just find where <header> is and where .banner is
  const headerIdx = html.indexOf('<header');
  const bannerIdx = html.indexOf('class="banner"');
  console.log(`Header starts at: ${headerIdx}`);
  console.log(`Banner starts at: ${bannerIdx}`);
  
  if (headerIdx !== -1) {
      console.log(html.substring(headerIdx, headerIdx + 1000));
  }
}

// Let's also check for header background images in the CSS
const css1 = fs.readFileSync('css_1.css', 'utf8');
const headerCssRegex = /header\s*{[^}]*background[^}]*}/gi;
let cssMatch;
while ((cssMatch = headerCssRegex.exec(css1)) !== null) {
  console.log(cssMatch[0]);
}

const headerBeforeRegex = /header:before\s*{[^}]*}/gi;
let beforeMatch;
while ((headerBeforeRegex.exec(css1)) !== null) {
  console.log("Has header:before pseudoelement");
}
