const https = require('https');
https.get('https://abbasyanugerahperkasa.com/assets/index-DlZdHVEO.js', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
});
