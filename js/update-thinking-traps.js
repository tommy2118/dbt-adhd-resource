/**
 * Script to update thinking-traps pages with proper CSS and JS references
 */

const fs = require('fs');
const path = require('path');

// Function to update a thinking trap page
function updateThinkingTrapPage(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Replace Tailwind CDN scripts with proper CSS link
  fileContent = fileContent.replace(
    /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>(\s*<style[\s\S]*?<\/style>)?/,
    '<link rel="stylesheet" href="/dist/output.css">'
  );

  // Replace inline JS with external script
  // This pattern is more complex for thinking trap pages
  const scriptEndIndex = fileContent.lastIndexOf('</script>');
  const bodyEndIndex = fileContent.lastIndexOf('</body>');
  
  if (scriptEndIndex > 0 && bodyEndIndex > scriptEndIndex) {
    // Extract everything between the last script and the body end
    const endPortion = fileContent.substring(scriptEndIndex + 9, bodyEndIndex).trim();
    
    // Replace the entire script block with our external script
    fileContent = fileContent.substring(0, fileContent.lastIndexOf('<script>')) +
      '<script src="/js/main.js" defer></script>' +
      endPortion +
      '</body>' +
      fileContent.substring(bodyEndIndex + 7);
  }

  // Write the updated content back to the file
  fs.writeFileSync(filePath, fileContent);
  console.log(`Updated: ${filePath}`);
}

// Process all thinking trap pages
const trapsDir = path.join(__dirname, '..', 'thinking-traps');
const trapFiles = fs.readdirSync(trapsDir);

trapFiles.forEach(file => {
  if (file.endsWith('.html')) {
    updateThinkingTrapPage(path.join(trapsDir, file));
  }
});

console.log('All thinking trap pages have been updated!');
