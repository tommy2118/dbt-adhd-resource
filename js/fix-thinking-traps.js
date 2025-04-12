/**
 * Script to standardize thinking trap pages and update navigation across all pages
 */

const fs = require('fs');
const path = require('path');

// Function to standardize a thinking trap page
function standardizeThinkingTrapPage(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Check if the page already has the standardized navigation
  if (fileContent.includes('nav-container fixed w-full z-50') && 
      fileContent.includes('<body class="min-h-screen">') &&
      fileContent.includes('thinking-traps/index.html')) {
    console.log(`Page already standardized: ${filePath}`);
    return false;
  }
  
  // Extract important content from the page
  let title = 'Thinking Traps';
  let description = 'Identify and challenge cognitive distortions that affect your emotions and behaviors.';
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
    <meta name="keywords" content="DBT, thinking traps, cognitive distortions, mental health, emotional wellness, ${title.toLowerCase()}">
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
            <a href="../modules/mindfulness.html" class="nav-link">Mindfulness</a>
            <a href="../modules/distress-tolerance.html" class="nav-link">Distress Tolerance</a>
            <a href="../modules/emotion-regulation.html" class="nav-link">Emotion Regulation</a>
            <a href="../modules/interpersonal.html" class="nav-link">Interpersonal Skills</a>
            <a href="index.html" class="nav-link" aria-current="page">Thinking Traps</a>
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
            <a href="../modules/mindfulness.html" class="nav-link px-4 py-2 rounded-lg">Mindfulness</a>
            <a href="../modules/distress-tolerance.html" class="nav-link px-4 py-2 rounded-lg">Distress Tolerance</a>
            <a href="../modules/emotion-regulation.html" class="nav-link px-4 py-2 rounded-lg">Emotion Regulation</a>
            <a href="../modules/interpersonal.html" class="nav-link px-4 py-2 rounded-lg">Interpersonal Skills</a>
            <a href="index.html" class="nav-link px-4 py-2 rounded-lg" aria-current="page">Thinking Traps</a>
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

  // Write the new standardized structure to the file
  fs.writeFileSync(filePath, newStructure);
  console.log(`Standardized thinking trap page: ${filePath}`);
  return true;
}

// Function to update navigation in a module page to include thinking traps
function updateModulePageNavigation(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Check if thinking traps are already in the navigation
  if (fileContent.includes('thinking-traps/index.html')) {
    console.log(`Navigation already updated in: ${filePath}`);
    return false;
  }
  
  // Update desktop navigation to include thinking traps
  const desktopNavRegex = /<div class="hidden md:flex space-x-8">([\s\S]*?)<\/div>/;
  const desktopNavMatch = fileContent.match(desktopNavRegex);
  
  if (desktopNavMatch) {
    const updatedDesktopNav = desktopNavMatch[0].replace(
      `<a href="interpersonal.html" class="nav-link`,
      `<a href="interpersonal.html" class="nav-link`
    ) + `
            <a href="../thinking-traps/index.html" class="nav-link">Thinking Traps</a>
          </div>`;
    
    fileContent = fileContent.replace(desktopNavMatch[0], updatedDesktopNav);
    updated = true;
  }
  
  // Update mobile menu to include thinking traps
  const mobileMenuRegex = /<div id="mobile-menu"[\s\S]*?<div class="flex flex-col space-y-4">([\s\S]*?)<\/div>/;
  const mobileMenuMatch = fileContent.match(mobileMenuRegex);
  
  if (mobileMenuMatch) {
    const updatedMobileMenu = mobileMenuMatch[0].replace(
      `<a href="interpersonal.html" class="nav-link px-4 py-2 rounded-lg`,
      `<a href="interpersonal.html" class="nav-link px-4 py-2 rounded-lg`
    ) + `
            <a href="../thinking-traps/index.html" class="nav-link px-4 py-2 rounded-lg">Thinking Traps</a>
          </div>`;
    
    fileContent = fileContent.replace(mobileMenuMatch[0], updatedMobileMenu);
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(filePath, fileContent);
    console.log(`Updated navigation in: ${filePath}`);
    return true;
  }
  
  console.log(`Navigation update failed in: ${filePath}`);
  return false;
}

// Function to update navigation in home page to include thinking traps
function updateHomePageNavigation(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Check if thinking traps are already in the main navigation
  if (fileContent.includes('<a href="thinking-traps/index.html" class="nav-link">')) {
    console.log(`Navigation already updated in: ${filePath}`);
    return false;
  }
  
  // Update desktop navigation to include thinking traps
  const desktopNavRegex = /<div class="hidden md:flex space-x-8">([\s\S]*?)<\/div>/;
  const desktopNavMatch = fileContent.match(desktopNavRegex);
  
  if (desktopNavMatch) {
    const updatedDesktopNav = desktopNavMatch[0].replace(
      `<a href="modules/interpersonal.html" class="nav-link">Interpersonal Skills</a>`,
      `<a href="modules/interpersonal.html" class="nav-link">Interpersonal Skills</a>
            <a href="thinking-traps/index.html" class="nav-link">Thinking Traps</a>`
    );
    
    fileContent = fileContent.replace(desktopNavMatch[0], updatedDesktopNav);
    updated = true;
  }
  
  // Update mobile menu to include thinking traps
  const mobileMenuRegex = /<div id="mobile-menu"[\s\S]*?<div class="flex flex-col space-y-4">([\s\S]*?)<\/div>/;
  const mobileMenuMatch = fileContent.match(mobileMenuRegex);
  
  if (mobileMenuMatch) {
    const updatedMobileMenu = mobileMenuMatch[0].replace(
      `<a href="modules/interpersonal.html" class="nav-link px-4 py-2 rounded-lg">Interpersonal Skills</a>`,
      `<a href="modules/interpersonal.html" class="nav-link px-4 py-2 rounded-lg">Interpersonal Skills</a>
            <a href="thinking-traps/index.html" class="nav-link px-4 py-2 rounded-lg">Thinking Traps</a>`
    );
    
    fileContent = fileContent.replace(mobileMenuMatch[0], updatedMobileMenu);
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(filePath, fileContent);
    console.log(`Updated navigation in home page: ${filePath}`);
    return true;
  }
  
  console.log(`Navigation update failed in home page: ${filePath}`);
  return false;
}

// Process all thinking trap pages
function processThinkingTraps() {
  const trapsDir = path.join(__dirname, '..', 'thinking-traps');
  const files = fs.readdirSync(trapsDir);
  let updatedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(trapsDir, file);
      const updated = standardizeThinkingTrapPage(filePath);
      if (updated) updatedCount++;
    }
  });
  
  return updatedCount;
}

// Process all module pages to update navigation
function updateModuleNavigation() {
  const modulesDir = path.join(__dirname, '..', 'modules');
  const files = fs.readdirSync(modulesDir);
  let updatedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(modulesDir, file);
      const updated = updateModulePageNavigation(filePath);
      if (updated) updatedCount++;
    }
  });
  
  return updatedCount;
}

// Update home page navigation
function updateHomePage() {
  const homePage = path.join(__dirname, '..', 'index.html');
  return updateHomePageNavigation(homePage) ? 1 : 0;
}

// Update all pages
console.log('Standardizing thinking trap pages...');
const trapsUpdated = processThinkingTraps();

console.log('Updating navigation in module pages...');
const modulesUpdated = updateModuleNavigation();

console.log('Updating navigation in home page...');
const homeUpdated = updateHomePage();

console.log(`Standardized structure in ${trapsUpdated} thinking trap pages.`);
console.log(`Updated navigation in ${modulesUpdated} module pages.`);
console.log(`Updated navigation in ${homeUpdated} home page.`);
