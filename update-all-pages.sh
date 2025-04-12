#!/bin/bash
# Comprehensive update script to apply design enhancements to all pages
# This script applies the new design system to all HTML pages in the project

# Set the root directory
ROOT_DIR="/Users/tcaruso/src/websites/dbt-adhd-resource"

# Function to add Google Fonts and CSS links
update_head() {
  file=$1
  echo "Updating head section in $file"
  
  # First check if already updated
  if grep -q "design-system.css" "$file"; then
    echo "✓ Already updated: $file"
    return
  fi
  
  # Replace Tailwind CDN with our CSS files (if Tailwind CDN exists)
  if grep -q "cdn.tailwindcss.com" "$file"; then
    sed -i '' 's#<script src="https://cdn.tailwindcss.com"></script>#<link rel="stylesheet" href="/dist/output.css">\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">\n    <link rel="stylesheet" href="/css/enhancements/design-system.css">#' "$file"
  else
    # If no Tailwind CDN, try to add our links before </head>
    sed -i '' 's#</head>#    <link rel="stylesheet" href="/dist/output.css">\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">\n    <link rel="stylesheet" href="/css/enhancements/design-system.css">\n</head>#' "$file"
  fi
  
  # Remove any inline styles related to tailwind
  sed -i '' '/<style type="text\/tailwindcss">/,/<\/style>/d' "$file"
}

# Function to update navigation with new design
update_navigation() {
  file=$1
  echo "Updating navigation in $file"
  
  # Create relative path to root
  relative_path=$(echo "$file" | sed "s#$ROOT_DIR/##" | sed 's#[^/]*$##' | sed 's#[^/]##g' | sed 's#/#../#g')
  if [ -z "$relative_path" ]; then
    relative_path="./"
  fi
  
  # Find navigation section (with some heuristics)
  if grep -q "nav-container" "$file"; then
    echo "✓ Navigation already updated: $file"
    return
  fi
  
  # Try to replace old navigation with new
  nav_replaced=false
  if grep -q "<nav " "$file"; then
    sed -i '' '/<nav /,/<\/nav>/c\
    <!-- Navigation -->\
    <div class="nav-container fixed w-full z-50 top-0">\
      <nav role="navigation" aria-label="Main navigation" class="container mx-auto px-4">\
        <div class="flex items-center justify-between h-16">\
          <a href="'$relative_path'index.html" class="text-2xl font-bold text-white hover:text-primary-light transition-colors" aria-label="The DBT Resource Home">\
            The DBT Resource\
          </a>\
          \
          <!-- Desktop Navigation -->\
          <div class="hidden md:flex space-x-8">\
            <a href="'$relative_path'index.html" class="nav-link">Home</a>\
            <a href="'$relative_path'modules/mindfulness.html" class="nav-link">Mindfulness</a>\
            <a href="'$relative_path'modules/distress-tolerance.html" class="nav-link">Distress Tolerance</a>\
            <a href="'$relative_path'modules/emotion-regulation.html" class="nav-link">Emotion Regulation</a>\
            <a href="'$relative_path'modules/interpersonal.html" class="nav-link">Interpersonal Skills</a>\
            <a href="'$relative_path'thinking-traps/index.html" class="nav-link">Thinking Traps</a>\
          </div>\
          \
          <!-- Mobile Menu Button -->\
          <button class="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors" \
                  aria-expanded="false"\
                  aria-controls="mobile-menu"\
                  aria-label="Toggle menu">\
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>\
            </svg>\
          </button>\
        </div>\
        \
        <!-- Mobile Menu -->\
        <div id="mobile-menu" class="md:hidden hidden py-4">\
          <div class="flex flex-col space-y-4">\
            <a href="'$relative_path'index.html" class="nav-link px-4 py-2 rounded-lg">Home</a>\
            <a href="'$relative_path'modules/mindfulness.html" class="nav-link px-4 py-2 rounded-lg">Mindfulness</a>\
            <a href="'$relative_path'modules/distress-tolerance.html" class="nav-link px-4 py-2 rounded-lg">Distress Tolerance</a>\
            <a href="'$relative_path'modules/emotion-regulation.html" class="nav-link px-4 py-2 rounded-lg">Emotion Regulation</a>\
            <a href="'$relative_path'modules/interpersonal.html" class="nav-link px-4 py-2 rounded-lg">Interpersonal Skills</a>\
            <a href="'$relative_path'thinking-traps/index.html" class="nav-link px-4 py-2 rounded-lg">Thinking Traps</a>\
          </div>\
        </div>\
      </nav>\
    </div>' "$file"
    nav_replaced=true
  fi
  
  # If couldn't find nav tag, try other approaches
  if [ "$nav_replaced" = false ]; then
    echo "⚠️ Could not update navigation automatically in $file"
  fi
}

# Function to add our JavaScript files
update_scripts() {
  file=$1
  echo "Updating scripts in $file"
  
  # First check if already updated
  if grep -q "enhancements.js" "$file"; then
    echo "✓ Scripts already updated: $file"
    return
  fi
  
  # Replace old scripts with our scripts
  if grep -q '<script src="/js/main.js"' "$file"; then
    sed -i '' 's#<script src="/js/main.js"#<script src="/js/main.js" defer></script>\n    <script src="/js/enhancements.js"#' "$file"
  else
    # Add our scripts before </body>
    sed -i '' 's#</body>#    <!-- Scripts -->\n    <script src="/js/main.js" defer></script>\n    <script src="/js/enhancements.js" defer></script>\n</body>#' "$file"
  fi
  
  # Remove any mobile menu scripts
  sed -i '' '/<script>\s*const menuToggle/,/<\/script>/d' "$file"
}

# Function to update content sections
update_content() {
  file=$1
  echo "Updating content sections in $file"
  
  # Convert regular sections to content-sections
  sed -i '' 's#<section>#<section class="content-section">#g' "$file"
  
  # Convert grid classes to card-grid
  sed -i '' 's#class="grid grid-cols-1 md:grid-cols-[0-9] lg:grid-cols-[0-9] gap-[0-9]"#class="card-grid"#g' "$file"
  sed -i '' 's#class="grid grid-cols-1 md:grid-cols-[0-9] gap-[0-9]"#class="card-grid"#g' "$file"
  
  # Convert old card styles to feature-card
  sed -i '' 's#class="bg-gray-800 p-6 rounded-lg shadow-lg#class="feature-card#g' "$file"
  sed -i '' 's#class="bg-gray-800 p-6 rounded-lg#class="feature-card#g' "$file"
  sed -i '' 's#class="p-6 bg-gray-800 rounded-lg shadow-lg#class="feature-card#g' "$file"
  sed -i '' 's#class="tool-card#class="feature-card#g' "$file"
  sed -i '' 's#class="content-card#class="feature-card#g' "$file"
  sed -i '' 's#class="skill-card#class="feature-card#g' "$file"
  
  # Convert buttons to use cta-button class
  sed -i '' 's#class="bg-purple-[0-9]00 text-white px-[0-9] py-[0-9] rounded-full hover:bg-purple-[0-9]00#class="cta-button#g' "$file"
  
  echo "✓ Content updated in $file"
}

# Process all HTML files
echo "Starting comprehensive design update..."
find "$ROOT_DIR" -name "*.html" | while read file; do
  echo "Processing: $file"
  update_head "$file"
  update_navigation "$file"
  update_scripts "$file"
  update_content "$file"
  echo "----------------------------------------"
done

echo "Design update complete! 🎉"
