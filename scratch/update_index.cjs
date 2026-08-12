const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /if \(e\.target && e\.target\.tagName === 'SCRIPT'\) \{/,
  `if (e.target && (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK')) {`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html');
