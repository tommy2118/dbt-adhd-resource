/**
 * Script to fix navigation and header issues in all pages
 */

const fs = require('fs');
const path = require('path');

// Function to fix navigation and header positioning in a page
function fixNavAndHeader(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Fix 1: Remove bg-dark from navigation container to match the home page's transparent nav
  if (fileContent.includes('nav-container fixed w-full z-50 bg-dark')) {
    fileContent = fileContent.replace(
      'nav-container fixed w-full z-50 bg-dark',
      'nav-container fixed w-full z-50'
    );
    updated = true;
  }
  
  // Fix 2: Standardize body class to match the home page
  if (fileContent.includes('<body class="min-h-screen bg-dark text-gray-300">')) {
    fileContent = fileContent.replace(
      '<body class="min-h-screen bg-dark text-gray-300">',
      '<body class="min-h-screen">'
    );
    updated = true;
  }
  
  // Fix 3: Remove the breadcrumb section
  if (fileContent.includes('<!-- Breadcrumb -->')) {
    const breadcrumbStart = fileContent.indexOf('<!-- Breadcrumb -->');
    const breadcrumbEnd = fileContent.indexOf('</div>', fileContent.indexOf('</nav>', breadcrumbStart)) + 6;
    
    if (breadcrumbStart !== -1 && breadcrumbEnd !== -1) {
      const beforeBreadcrumb = fileContent.substring(0, breadcrumbStart);
      const afterBreadcrumb = fileContent.substring(breadcrumbEnd);
      
      // Clean up any leftover empty divs that might result from removing the breadcrumb
      let cleanedContent = beforeBreadcrumb + afterBreadcrumb;
      cleanedContent = cleanedContent.replace(/\s+<\/div>\s+\n\s+<!-- Header -->/g, '\n\n    <!-- Header -->');
      
      fileContent = cleanedContent;
      updated = true;
    }
  }
  
  // Write the updated content back to the file if changes were made
  if (updated) {
    fs.writeFileSync(filePath, fileContent);
    console.log(`Fixed navigation in: ${filePath}`);
    return true;
  }
  
  console.log(`No navigation fixes needed in: ${filePath}`);
  return false;
}

// Process all HTML files in the given directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(dir, file);
      const updated = fixNavAndHeader(filePath);
      if (updated) updatedCount++;
    }
  });
  
  return updatedCount;
}

// Update all module pages
console.log('Fixing navigation in module pages...');
const modulesDir = path.join(__dirname, '..', 'modules');
const modulesUpdated = processDirectory(modulesDir);

// Update all thinking trap pages
console.log('Fixing navigation in thinking trap pages...');
const trapsDir = path.join(__dirname, '..', 'thinking-traps');
const trapsUpdated = processDirectory(trapsDir);

// Update all tool pages
console.log('Fixing navigation in tool pages...');
const toolsDir = path.join(__dirname, '..', 'tools');
let toolsUpdated = 0;
if (fs.existsSync(toolsDir)) {
  toolsUpdated = processDirectory(toolsDir);
}

console.log(`Fixed navigation in ${modulesUpdated + trapsUpdated + toolsUpdated} pages total.`);
console.log(`- Modules: ${modulesUpdated}`);
console.log(`- Thinking Traps: ${trapsUpdated}`);
console.log(`- Tools: ${toolsUpdated}`);
