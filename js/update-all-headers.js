/**
 * Script to update headers in all pages to match the hero style from the homepage
 */

const fs = require('fs');
const path = require('path');

// Function to update the header in a page
function updateHeaderInPage(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file has the old header style (either purple background or gradient)
  if (fileContent.includes('bg-purple-600 text-white py-8') || 
      fileContent.includes('<header class="bg-') ||
      fileContent.includes('bg-gradient-to-r from-purple-600')) {
    
    // Extract the title and subtitle to preserve them
    let title = '';
    let subtitle = '';
    
    // Try to extract the title from the header
    const titleMatch = fileContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
    if (titleMatch && titleMatch[1]) {
      // Clean any HTML tags inside the title
      title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
    }
    
    // Try to extract the subtitle
    let subtitleMatch = fileContent.match(/<p[^>]*>\s*(?:Develop|Learn|Discover|Practice|Master|Explore|Identify)[^<]*<\/p>/s);
    
    // If no match with those verbs, try a generic match for a paragraph in the header
    if (!subtitleMatch) {
      subtitleMatch = fileContent.match(/<header[^>]*>[\s\S]*?<h1[^>]*>.*?<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
    }
    
    if (subtitleMatch && subtitleMatch[0]) {
      subtitle = subtitleMatch[0].replace(/<[^>]*>/g, '').trim();
    }
    
    // Replace the old header with the new hero-style header
    fileContent = fileContent.replace(
      /<header[^>]*>[\s\S]*?<\/header>/,
      `<header class="hero-bg pt-32 pb-24">
      <div class="hero-content container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          ${title || 'DBT Skills'}
        </h1>
        <p class="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-12">
          ${subtitle || 'Learn essential skills for emotional wellness and personal growth.'}
        </p>
      </div>
    </header>`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, fileContent);
    console.log(`Updated header in: ${filePath}`);
    return true;
  }
  
  console.log(`Header already updated or not found in: ${filePath}`);
  return false;
}

// Process all HTML files in the given directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(dir, file);
      const updated = updateHeaderInPage(filePath);
      if (updated) updatedCount++;
    }
  });
  
  return updatedCount;
}

// Update all module pages
console.log('Updating module pages...');
const modulesDir = path.join(__dirname, '..', 'modules');
const modulesUpdated = processDirectory(modulesDir);

// Update all thinking trap pages
console.log('Updating thinking trap pages...');
const trapsDir = path.join(__dirname, '..', 'thinking-traps');
const trapsUpdated = processDirectory(trapsDir);

// Update all tool pages
console.log('Updating tool pages...');
const toolsDir = path.join(__dirname, '..', 'tools');
let toolsUpdated = 0;
if (fs.existsSync(toolsDir)) {
  toolsUpdated = processDirectory(toolsDir);
}

console.log(`Updated headers in ${modulesUpdated + trapsUpdated + toolsUpdated} pages total.`);
console.log(`- Modules: ${modulesUpdated}`);
console.log(`- Thinking Traps: ${trapsUpdated}`);
console.log(`- Tools: ${toolsUpdated}`);
