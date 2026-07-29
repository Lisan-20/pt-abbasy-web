const fs = require('fs');
let c = fs.readFileSync('public/manajemen-web/config.yml', 'utf8');

const navBlock = `              - label: "Navigation Menu"
                name: "navigation"
                widget: "list"
                collapsed: true
                summary: "{{label}}"
                required: false
                fields:
                  - {label: "Label Menu", name: "label", widget: "string"}
                  - {label: "URL/Tautan (Kosongkan jika dropdown)", name: "path", widget: "string", required: false}
                  - {label: "Jadikan Tombol Utama", name: "isButton", widget: "boolean", default: false}
                  - label: "Sub-Menu (Dropdown)"
                    name: "children"
                    widget: "list"
                    collapsed: true
                    required: false
                    fields:
                      - {label: "Label Sub-Menu", name: "label", widget: "string"}
                      - {label: "URL/Tautan", name: "path", widget: "string"}`;

c = c.replace(/\s*- label: "Navigation Menu"[\s\S]*?isButton", widget: "boolean", default: false}/, '\n' + navBlock);

fs.writeFileSync('public/manajemen-web/config.yml', c);
