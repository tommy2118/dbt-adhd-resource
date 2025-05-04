#!/bin/bash

# Script to update footers in all module pages

# Define the old footer pattern
OLD_FOOTER='    <footer class="bg-gray-900 mt-20 py-12">
      <div class="container mx-auto px-4 text-center">
        <p class="text-gray-400">&copy; 2024 The DBT Resource. Designed with compassion and accessibility in mind.</p>
      </div>
    </footer>

    <!-- Scripts -->
    <script src="/js/main.js" defer></script>
    <script src="/js/enhancements.js" defer></script>
  </body>
</html>'

# Define the new enhanced footer
NEW_FOOTER='    <footer class="bg-gray-900 text-gray-400 py-12">
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
</html>'

# Find all module pages (excluding the mindfulness pages we already updated)
MODULE_PAGES=$(find modules -name "*.html" -not -path "modules/mindfulness*.html" -not -path "modules/distress-tolerance.html" -not -path "modules/emotion-regulation.html" -not -path "modules/interpersonal.html")

# Loop through each page and update the footer
for page in $MODULE_PAGES; do
  # Make a backup first
  cp "$page" "${page}.bak"
  
  # Replace the footer
  sed -i '' "s|$OLD_FOOTER|$NEW_FOOTER|g" "$page"
  
  echo "Updated footer in $page"
done

echo "All module footers have been updated!"