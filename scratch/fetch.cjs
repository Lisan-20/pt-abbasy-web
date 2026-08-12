const https = require('https');
https.get('https://abbasyanugerahperkasa.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/src="\/assets\/index-.*\.js"/);
    console.log(match ? match[0] : 'No match');
  });
});
