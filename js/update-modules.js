/**
 * Script to update module pages with proper CSS and JS references
 */

const fs = require('fs');
const path = require('path');

// Function to update a module page
function updateModulePage(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Replace Tailwind CDN scripts with proper CSS link
  fileContent = fileContent.replace(
    /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>(\s*<style>[\s\S]*?<\/style>)?/,
    '<link rel="stylesheet" href="/dist/output.css">'
  );

  // Replace inline JS with external script
  fileContent = fileContent.replace(
    /<script>\s*(const|let|var|document|\(function)[\s\S]*?<\/script>\s*<\/body>/,
    '<script src="/js/main.js" defer></script>\n</body>'
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, fileContent);
  console.log(`Updated: ${filePath}`);
}

// Process all module pages
const modulesDir = path.join(__dirname, '..', 'modules');
const moduleFiles = fs.readdirSync(modulesDir);

moduleFiles.forEach(file => {
  if (file.endsWith('.html')) {
    updateModulePage(path.join(modulesDir, file));
  }
});

console.log('All module pages have been updated!');
