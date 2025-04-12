/**
 * Script to update headers in module pages to match the hero style from the homepage
 */

const fs = require('fs');
const path = require('path');

// Function to update the header in a module page
function updateHeaderInModulePage(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file has the old header style
  if (fileContent.includes('bg-purple-600 text-white py-8') || 
      fileContent.includes('<header class="bg-')) {
    
    // Extract the title and subtitle to preserve them
    let title = '';
    let subtitle = '';
    
    // Try to extract the title
    const titleMatch = fileContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }
    
    // Try to extract the subtitle
    const subtitleMatch = fileContent.match(/<p[^>]*>\s*(?:Develop|Learn|Discover|Practice|Master|Explore)[^<]*<\/p>/s);
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

// Process all module pages
const modulesDir = path.join(__dirname, '..', 'modules');
const moduleFiles = fs.readdirSync(modulesDir);

let updatedCount = 0;
moduleFiles.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(modulesDir, file);
    const updated = updateHeaderInModulePage(filePath);
    if (updated) updatedCount++;
  }
});

console.log(`Updated headers in ${updatedCount} module pages.`);
