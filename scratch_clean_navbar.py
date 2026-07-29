import re
with open('src/components/Navbar.jsx', 'r', encoding='utf-8') as f:
    c = f.read()
c = re.sub(r'<div className="language-switcher-desktop hidden md:block">\s*</div>', '', c)
c = re.sub(r'<div className="language-switcher-mobile md:hidden ml-2">\s*</div>', '', c)
with open('src/components/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(c)
