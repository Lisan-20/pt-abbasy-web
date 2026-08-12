const https = require('https');
https.get('https://abbasyanugerahperkasa.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const css = data.match(/href="\/assets\/index-.*?\.css"/);
    const js = data.match(/src="\/assets\/index-.*?\.js"/);
    console.log(css ? css[0] : 'No CSS match');
    console.log(js ? js[0] : 'No JS match');
  });
});
