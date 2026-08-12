const fs = require('fs');
const marked = require('marked');
const puppeteer = require('puppeteer');
const path = require('path');

const mdPath = 'C:\\Users\\lsidq\\.gemini\\antigravity\\brain\\16f8d218-40fb-4732-b9b3-662111b841e1\\portfolio_document.md';
const pdfPath = 'C:\\Users\\lsidq\\Desktop\\Portfolio_Supporting_Document.pdf';

const markdown = fs.readFileSync(mdPath, 'utf8');
const htmlContent = marked.parse(markdown);

const styledHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 0;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-size: 28px; margin-top: 0; }
    h2 { color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 30px; }
    h3 { color: #475569; margin-top: 20px; }
    p, li { font-size: 14px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; }
    a { color: #2563eb; text-decoration: none; }
    strong { color: #0f172a; }
    hr { border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
`;

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setContent(styledHtml, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true
    });
    await browser.close();
    console.log('PDF generated successfully at ' + pdfPath);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
})();
