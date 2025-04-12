#!/bin/bash

# Build the CSS first
echo "Building CSS..."
npm run build

# Fix navigation and header issues
echo "Fixing navigation and headers..."
node js/fix-nav-headers.js

# Update the headers to match the hero style
echo "Updating headers..."
node js/update-all-headers.js

# Run the update scripts
echo "Updating module pages..."
node js/update-modules.js

echo "Updating thinking trap pages..."
node js/update-thinking-traps.js

echo "All pages have been updated!"
echo "You can now commit the changes and push to GitHub Pages."
