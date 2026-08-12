const https = require('https');
https.get('https://abbasyanugerahperkasa.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/href="\/assets\/index-.*?\.css"/);
    console.log(match ? match[0] : 'No CSS match');
  });
});
