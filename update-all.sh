#!/bin/bash

# Build the CSS first
echo "Building CSS..."
npm run build

# Fix navigation and header issues
echo "Fixing navigation and headers..."
node js/fix-nav-headers.js

# Standardize module page structure
echo "Standardizing module pages..."
node js/fix-module-structure.js

# Standardize thinking trap pages
echo "Standardizing thinking trap pages..."
node js/fix-thinking-traps.js

# Fix module navigation
echo "Fixing module navigation..."
node js/fix-module-navigation.js

# Update the headers to match the hero style
echo "Updating headers..."
node js/update-all-headers.js

# Run the update scripts
echo "Updating module pages..."
node js/update-modules.js

echo "Updating thinking trap pages..."
node js/update-thinking-traps.js

# Final build
echo "Final CSS build..."
npm run build

echo "All pages have been updated!"
echo "You can now commit the changes and push to GitHub Pages."
