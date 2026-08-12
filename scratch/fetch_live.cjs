const https = require('https');
https.get('https://abbasyanugerahperkasa.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const cssMatch = data.match(/href="(\/assets\/index-[^"]+\.css)"/);
    const jsMatch = data.match(/src="(\/assets\/index-[^"]+\.js)"/);
    console.log('CSS path:', cssMatch ? cssMatch[1] : null);
    console.log('JS path:', jsMatch ? jsMatch[1] : null);
    
    if (jsMatch && jsMatch[1]) {
      https.get('https://abbasyanugerahperkasa.com' + jsMatch[1], (jsRes) => {
        console.log('JS Status:', jsRes.statusCode);
        console.log('JS Content-Type:', jsRes.headers['content-type']);
        let jsData = '';
        jsRes.on('data', chunk => jsData += chunk);
        jsRes.on('end', () => {
          console.log('JS length:', jsData.length, 'starts with:', jsData.slice(0, 100).replace(/\n/g, '\\n'));
        });
      });
    }
  });
});
