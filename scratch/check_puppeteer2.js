import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('response', response => {
    const url = response.url();
    const type = response.headers()['content-type'];
    if (url.endsWith('.js') && type && type.includes('text/html')) {
      console.log('BAD JS FILE:', url);
    }
  });

  await page.goto('https://abbasyanugerahperkasa.com/');
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
})();
