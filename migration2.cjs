const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'content', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (data.pages) {
  data.pages.forEach(page => {
    if (page.blocks) {
      page.blocks.forEach(block => {
        if (block.type === 'aboutBlock') {
          block.items = [];
          if (block.vision) {
            block.items.push({ title: "Visi Kami", content: block.vision });
          }
          if (block.mission) {
            block.items.push({ title: "Misi Kami", content: block.mission });
          }
          delete block.vision;
          delete block.mission;
        }
      });
    }
  });
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log("Data migration 2 successful.");
