const fs = require('fs');

// 1. Update config.yml
let config = fs.readFileSync('public/manajemen-web/config.yml', 'utf8');
const navRegex = /              - label: "Navigation Menu"/;
if (navRegex.test(config)) {
  config = config.replace(navRegex, `              - label: "Tautan Cepat Footer"
                name: "footerQuickLinks"
                widget: "list"
                collapsed: true
                summary: "{{label}}"
                required: false
                fields:
                  - {label: "Label", name: "label", widget: "string"}
                  - {label: "URL Path", name: "path", widget: "string"}
              - label: "Navigation Menu"`);
  fs.writeFileSync('public/manajemen-web/config.yml', config, 'utf8');
  console.log('Updated config.yml');
} else {
  console.log('Failed to update config.yml - regex not found');
}

// 2. Update data.json
let dataStr = fs.readFileSync('src/content/data.json', 'utf8');
let data = JSON.parse(dataStr);
if (!data.siteSettings.footerQuickLinks) {
  data.siteSettings.footerQuickLinks = [
    { "label": "Tentang Kami", "path": "/about" },
    { "label": "Layanan Kami", "path": "/services" },
    { "label": "Portofolio Proyek", "path": "/portfolio" },
    { "label": "Tenaga Ahli", "path": "/experts" },
    { "label": "Legalitas", "path": "/legal" }
  ];
  fs.writeFileSync('src/content/data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated data.json');
}

// 3. Update Footer.jsx
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');
const oldQuickLinksRegex = /<li><Link to="\/about".*?>Tentang Kami<\/Link><\/li>\s*<li><Link to="\/services".*?>Layanan Kami<\/Link><\/li>\s*<li><Link to="\/portfolio".*?>Portofolio Proyek<\/Link><\/li>\s*<li><Link to="\/experts".*?>Tenaga Ahli<\/Link><\/li>\s*<li><Link to="\/legal".*?>Legalitas<\/Link><\/li>/;

const newQuickLinks = `{siteSettings?.footerQuickLinks ? (
                siteSettings.footerQuickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/about" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Tentang Kami</Link></li>
                  <li><Link to="/services" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Layanan Kami</Link></li>
                  <li><Link to="/portfolio" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Portofolio Proyek</Link></li>
                  <li><Link to="/experts" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Tenaga Ahli</Link></li>
                  <li><Link to="/legal" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Legalitas</Link></li>
                </>
              )}`;

if (oldQuickLinksRegex.test(footer)) {
  footer = footer.replace(oldQuickLinksRegex, newQuickLinks);
  fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
  console.log('Updated Footer.jsx');
} else {
  console.log('Failed to update Footer.jsx - regex not found');
}
