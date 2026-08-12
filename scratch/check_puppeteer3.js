import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('index-DlZdHVEO.js')) {
      console.log('JS STATUS:', response.status());
      console.log('JS TYPE:', response.headers()['content-type']);
      const text = await response.text();
      console.log('JS BODY LENGTH:', text.length);
      console.log('JS BODY PREVIEW:', text.substring(0, 100));
    }
  });

  await page.goto('https://abbasyanugerahperkasa.com/');
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
})();
