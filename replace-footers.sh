#!/bin/bash

# Enhanced footer to add to all module pages
cat > enhanced-footer.txt << 'EOL'
    <footer class="bg-gray-900 text-gray-400 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold text-white mb-4">The DBT Resource</h3>
            <p class="mb-4">Tools and resources for emotional wellness and personal growth through Dialectical Behavior Therapy.</p>
            <p>&copy; 2025 The DBT Resource. Designed for impact and accessibility.</p>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="../index.html" class="hover:text-primary-light transition-colors">Home</a></li>
              <li><a href="mindfulness.html" class="hover:text-primary-light transition-colors">Mindfulness</a></li>
              <li><a href="distress-tolerance.html" class="hover:text-primary-light transition-colors">Distress Tolerance</a></li>
              <li><a href="emotion-regulation.html" class="hover:text-primary-light transition-colors">Emotion Regulation</a></li>
              <li><a href="interpersonal.html" class="hover:text-primary-light transition-colors">Interpersonal Skills</a></li>
              <li><a href="../thinking-traps/index.html" class="hover:text-primary-light transition-colors">Thinking Traps</a></li>
              <li><a href="../tools/index.html" class="hover:text-primary-light transition-colors">Tools & Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white mb-4">Important Note</h3>
            <p class="mb-4">The DBT Resource is designed to provide educational information about Dialectical Behavior Therapy skills. This website is not a substitute for professional mental health treatment.</p>
            <p>If you're in crisis or need immediate support, please contact a mental health professional or crisis line.</p>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>Created by Tommy A. Caruso | <a href="#" class="hover:text-primary-light transition-colors">Privacy Policy</a> | <a href="#" class="hover:text-primary-light transition-colors">Terms of Use</a></p>
        </div>
      </div>
    </footer>

    <!-- Scripts -->
    <script src="/js/main.js" defer></script>
    <script src="/js/enhancements.js" defer></script>
  </body>
</html>
EOL

# Find all module pages (excluding the ones we already updated)
MODULE_PAGES=$(find modules -name "*.html" -not -path "*/mindfulness*.html" -not -path "*/distress-tolerance.html" -not -path "*/emotion-regulation.html" -not -path "*/interpersonal.html")

# Loop through each page and update the footer
for page in $MODULE_PAGES; do
  # Make a backup first
  cp "$page" "${page}.bak"
  
  # Use awk to replace the footer section
  awk '{
    if (/<footer/) {
      in_footer = 1
    }
    if (!in_footer) {
      print
    }
    if (/<\/html>/) {
      exit
    }
  }' "$page" > "${page}.tmp"
  
  cat "${page}.tmp" > "$page"
  cat enhanced-footer.txt >> "$page"
  rm "${page}.tmp"
  
  echo "Updated footer in $page"
done

# Clean up
rm enhanced-footer.txt

echo "All module footers have been updated!"