const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const errors = [];
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const allFiles = [];

function walk(dir, base) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const rel = path.posix.join(base, e.name);
    if (e.isDirectory()) walk(full, rel);
    else allFiles.push(rel);
  }
}
walk(root, '');

function checkPage(file, refBase) {
  const p = path.join(root, file);
  const html = fs.readFileSync(p, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="((?!http|https|mailto|tel|#|data:)[^"]+)"/g)].map(m => m[1]);
  for (const ref of refs) {
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    const resolved = path.posix.normalize(path.posix.join(refBase, clean));
    if (!allFiles.includes(resolved)) {
      errors.push(`${file}: missing ${resolved} (from "${ref}")`);
    }
  }
}

for (const file of htmlFiles) {
  checkPage(file, '');
  const p = path.join(root, file);
  const html = fs.readFileSync(p, 'utf8');
  const isDashboard = html.includes('data-page="dashboard"');
  for (const id of ['navbar', 'backTop']) {
    if (id === 'navbar' && isDashboard) continue;
    if (!html.includes(`id="${id}"`)) errors.push(`${file}: missing #${id}`);
  }
  const noFooter = file === 'login.html' || file === 'register.html' || isDashboard;
  if (!noFooter && !html.includes('id="footer"')) errors.push(`${file}: missing #footer`);
  if (!html.includes('css/style.css')) errors.push(`${file}: missing style.css link`);
  if (!isDashboard && !html.includes('js/navbar.js')) errors.push(`${file}: missing navbar.js`);
  if (!noFooter && !html.includes('js/footer.js')) errors.push(`${file}: missing footer.js`);
  if (!html.includes('js/main.js')) errors.push(`${file}: missing main.js`);
}

const adminDir = path.join(root, 'admin');
const adminPages = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));
for (const file of adminPages) {
  const rel = `admin/${file}`;
  checkPage(rel, 'admin');
  const html = fs.readFileSync(path.join(root, rel), 'utf8');
  if (!html.includes('css/style.css')) errors.push(`${rel}: missing style.css link`);
  if (!html.includes('js/main.js')) errors.push(`${rel}: missing main.js`);
}

if (errors.length) {
  console.log('ERRORS FOUND:');
  errors.forEach(e => console.log('  - ' + e));
  process.exit(1);
} else {
  console.log(`OK: ${htmlFiles.length} root pages + ${adminPages.length} admin pages verified. All references resolve.`);
  console.log(`Root: ${htmlFiles.join(', ')}`);
  console.log(`Admin: ${adminPages.map(f => 'admin/' + f).join(', ')}`);
}
