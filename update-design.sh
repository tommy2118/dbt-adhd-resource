#!/bin/bash
# Update design for all module and thinking trap pages

# Function to add design enhancements to a page
update_page() {
  file=$1
  echo "Updating design for $file"
  
  # Add Google Fonts and CSS enhancements
  sed -i '' 's#<link rel="stylesheet" href="/dist/output.css">#<link rel="stylesheet" href="/dist/output.css">\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">\n    <link rel="stylesheet" href="/css/enhancements/design-system.css">#' "$file"
  
  # Add enhanced JS
  sed -i '' 's#<script src="/js/main.js" defer></script>#<script src="/js/main.js" defer></script>\n    <script src="/js/enhancements.js" defer></script>#' "$file"
  
  # Convert regular sections to content-sections
  sed -i '' 's#<section>#<section class="content-section">#g' "$file"
  
  # Convert card grids
  sed -i '' 's#<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">#<div class="card-grid">#g' "$file"
  sed -i '' 's#<div class="grid grid-cols-1 md:grid-cols-2 gap-8">#<div class="card-grid">#g' "$file"
  
  # Convert regular cards to feature-cards
  sed -i '' 's#<div class="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">#<div class="feature-card">#g' "$file"
  
  echo "✅ Updated $file"
}

# Update all module pages
for file in modules/*.html; do
  update_page "$file"
done

# Update all thinking trap pages
for file in thinking-traps/*.html; do
  update_page "$file"
done

echo "Design update complete! 🎉"
