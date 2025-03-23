# DBT Resource Site Configuration

## Build/Test Commands
- No build process required - static HTML/CSS/JS site
- To test locally: open `index.html` in browser
- For live updates: use browser's dev tools or run a local server:
  ```
  python3 -m http.server
  ```

## Code Style Guidelines

### HTML
- Use HTML5 doctype and UTF-8 encoding
- Maintain kebab-case for filenames (e.g., `cope-ahead-plan.html`)
- Follow semantic HTML practices using appropriate tags

### CSS
- Uses Tailwind CSS via CDN
- Custom animations defined in style tags
- Class naming follows Tailwind convention

### JavaScript
- Minimal JS for UI interactions
- Simple event listeners for mobile menu toggle
- Keep scripts at end of body

### Structure
- Organized by modules and tools in separate directories
- Consistent navigation structure across pages
- Google Tag Manager included in all pages

### Content
- Informative meta descriptions for SEO
- Consistent header/footer across pages
- Mobile-responsive design