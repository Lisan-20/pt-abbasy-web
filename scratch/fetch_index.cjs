const https = require('https');
https.get('https://abbasyanugerahperkasa.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/src="\/assets\/index-.*?\.js"/g);
    console.log('INDEX HTML REQUESTS:', match);
  });
});
