/**
 * Script to completely standardize the structure of module pages to match the home page
 */

const fs = require('fs');
const path = require('path');

// Function to completely restructure a module page to match the home page
function restructureModulePage(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Extract important content from the page
  let title = 'DBT Module';
  let description = 'Learn essential skills for emotional wellness.';
  let originalBody = '';
  
  // Extract the title
  const titleMatch = fileContent.match(/<title>(.*?)<\/title>/);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1].replace(' - The DBT Resource', '');
  }
  
  // Extract the meta description
  const descMatch = fileContent.match(/<meta name="description" content="(.*?)">/);
  if (descMatch && descMatch[1]) {
    description = descMatch[1];
  }
  
  // Extract the header content if it exists
  let h1Text = title;
  let pText = description;
  
  const h1Match = fileContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
  if (h1Match && h1Match[1]) {
    h1Text = h1Match[1].replace(/<[^>]*>/g, '').trim();
  }
  
  const headerPMatch = fileContent.match(/<header[^>]*>.*?<p[^>]*>(.*?)<\/p>/s);
  if (headerPMatch && headerPMatch[1]) {
    pText = headerPMatch[1].replace(/<[^>]*>/g, '').trim();
  }
  
  // Extract the main content
  let mainContent = '';
  const mainMatch = fileContent.match(/<main[^>]*>(.*?)<\/main>/s);
  if (mainMatch && mainMatch[1]) {
    mainContent = mainMatch[1];
  }
  
  // Create the new standardized structure
  const newStructure = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <meta name="author" content="The DBT Resource">
    <meta name="keywords" content="DBT, Dialectical Behavior Therapy, mental health, emotional wellness, ${title.toLowerCase()}">
    <meta name="theme-color" content="#9333EA">
    
    <title>${title} | The DBT Resource</title>
    
    <!-- Styles -->
    <link rel="stylesheet" href="/dist/output.css">
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L29EXB8PZ7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L29EXB8PZ7');
    </script>
  </head>
  <body class="min-h-screen">
    <!-- Skip to Content Link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Navigation -->
    <div class="nav-container fixed w-full z-50">
      <nav role="navigation" aria-label="Main navigation" class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <a href="../index.html" class="text-2xl font-bold text-white hover:text-primary-light transition-colors" aria-label="The DBT Resource Home">
            The DBT Resource
          </a>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8">
            <a href="../index.html" class="nav-link">Home</a>
            <a href="mindfulness.html" class="nav-link"${title === 'Mindfulness' ? ' aria-current="page"' : ''}>Mindfulness</a>
            <a href="distress-tolerance.html" class="nav-link"${title === 'Distress Tolerance' ? ' aria-current="page"' : ''}>Distress Tolerance</a>
            <a href="emotion-regulation.html" class="nav-link"${title === 'Emotion Regulation' ? ' aria-current="page"' : ''}>Emotion Regulation</a>
            <a href="interpersonal.html" class="nav-link"${title === 'Interpersonal Skills' ? ' aria-current="page"' : ''}>Interpersonal Skills</a>
          </div>
          
          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors" 
                  aria-expanded="false"
                  aria-controls="mobile-menu"
                  aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="md:hidden hidden py-4">
          <div class="flex flex-col space-y-4">
            <a href="../index.html" class="nav-link px-4 py-2 rounded-lg">Home</a>
            <a href="mindfulness.html" class="nav-link px-4 py-2 rounded-lg"${title === 'Mindfulness' ? ' aria-current="page"' : ''}>Mindfulness</a>
            <a href="distress-tolerance.html" class="nav-link px-4 py-2 rounded-lg"${title === 'Distress Tolerance' ? ' aria-current="page"' : ''}>Distress Tolerance</a>
            <a href="emotion-regulation.html" class="nav-link px-4 py-2 rounded-lg"${title === 'Emotion Regulation' ? ' aria-current="page"' : ''}>Emotion Regulation</a>
            <a href="interpersonal.html" class="nav-link px-4 py-2 rounded-lg"${title === 'Interpersonal Skills' ? ' aria-current="page"' : ''}>Interpersonal Skills</a>
          </div>
        </div>
      </nav>
    </div>

    <!-- Header -->
    <header class="hero-bg pt-32 pb-24">
      <div class="hero-content container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          ${h1Text}
        </h1>
        <p class="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-12">
          ${pText}
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="container mx-auto px-4 py-16">
      ${mainContent}
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 mt-20 py-12">
      <div class="container mx-auto px-4 text-center">
        <p class="text-gray-400">&copy; 2024 The DBT Resource. Designed with compassion and accessibility in mind.</p>
      </div>
    </footer>

    <!-- Scripts -->
    <script src="/js/main.js" defer></script>
  </body>
</html>
`;

  // Check if the page has already been standardized
  if (fileContent.includes('nav-container fixed w-full z-50') && 
      fileContent.includes('<body class="min-h-screen">') &&
      !fileContent.includes('<nav class="bg-gray-800 text-white py-4">')) {
    console.log(`Page already standardized: ${filePath}`);
    return false;
  }
  
  // Write the new standardized structure to the file
  fs.writeFileSync(filePath, newStructure);
  console.log(`Standardized page structure: ${filePath}`);
  return true;
}

// Process all HTML files in the modules directory
function processModules() {
  const modulesDir = path.join(__dirname, '..', 'modules');
  const files = fs.readdirSync(modulesDir);
  let updatedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(modulesDir, file);
      
      // Skip the already fixed mindfulness.html file
      if (file === 'mindfulness.html') {
        console.log(`Skipping already fixed file: ${filePath}`);
        return;
      }
      
      const updated = restructureModulePage(filePath);
      if (updated) updatedCount++;
    }
  });
  
  return updatedCount;
}

// Update all module pages
console.log('Standardizing module page structures...');
const modulesUpdated = processModules();

console.log(`Standardized structure in ${modulesUpdated} module pages.`);
