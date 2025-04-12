/**
 * Script to fix navigation structure in module pages
 */

const fs = require('fs');
const path = require('path');

// Function to fix navigation in module pages
function fixModuleNavigation(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Check if the navigation is already correct
  if (content.includes('<a href="../thinking-traps/index.html" class="nav-link">Thinking Traps</a>') &&
      !content.includes('</div>\n            <a href="../thinking-traps/index.html" class="nav-link">')) {
    console.log(`Navigation already correct in: ${filePath}`);
    return false;
  }

  // Fix desktop navigation
  const desktopNavPattern = /<div class="hidden md:flex space-x-8">([\s\S]*?)<\/div>\s*<a href="\.\.\/thinking-traps\/index\.html"/;
  if (content.match(desktopNavPattern)) {
    content = content.replace(
      desktopNavPattern,
      '<div class="hidden md:flex space-x-8">$1<a href="../thinking-traps/index.html"'
    );
    updated = true;
  }

  // Fix mobile navigation
  const mobileNavPattern = /<div class="flex flex-col space-y-4">([\s\S]*?)<\/div>\s*<a href="\.\.\/thinking-traps\/index\.html"/;
  if (content.match(mobileNavPattern)) {
    content = content.replace(
      mobileNavPattern,
      '<div class="flex flex-col space-y-4">$1<a href="../thinking-traps/index.html"'
    );
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed navigation in: ${filePath}`);
    return true;
  }

  console.log(`No navigation fixes needed in: ${filePath}`);
  return false;
}

// Process all module pages
function processModules() {
  const modulesDir = path.join(__dirname, '..', 'modules');
  const files = fs.readdirSync(modulesDir);
  let updatedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(modulesDir, file);
      const updated = fixModuleNavigation(filePath);
      if (updated) updatedCount++;
    }
  });
  
  return updatedCount;
}

// Run the script
console.log('Fixing navigation in module pages...');
const updatedCount = processModules();
console.log(`Fixed navigation in ${updatedCount} module pages.`);
