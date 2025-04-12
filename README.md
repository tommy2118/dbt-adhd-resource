## Recent Improvements

### Code Structure
- Replaced inline Tailwind CDN with proper compiled CSS
- Moved all JavaScript to external files for better maintainability
- Consolidated CSS styles from multiple files into a single source
- Optimized for GitHub Pages deployment

### Performance
- Improved loading performance by removing redundant CSS and JS
- Minified CSS output for production
- Fixed navigation issues across different page types

### Development Workflow
- Added proper development scripts
- Created local development server options
- Added update scripts for maintaining consistency

### How to Apply Changes

To update all pages consistently:
```bash
# Run the update script
./update-all.sh
```

This script will:
1. Build the minified CSS
2. Update all module pages
3. Update all thinking trap pages

# DBT & ADHD Resource

A complete DBT resource website with ADHD-specific applications. Includes:
- DBT modules (Mindfulness, Distress Tolerance, Emotion Regulation, Interpersonal Effectiveness)
- Special emphasis topics (Thinking Traps, Lemons to Lemonade, Radical Acceptance, Self-Soothe)
- Interactive tools and worksheets.

## Development

### Prerequisites
- Node.js (14.x or later)
- npm (6.x or later)

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/dbt-adhd-resource.git
   cd dbt-adhd-resource
   ```

2. Install dependencies
   ```bash
   npm install
   ```
   This will install all the required packages including:
   - tailwindcss - For CSS framework
   - live-server - For local development server
   - concurrently - To run multiple commands simultaneously

3. Start the development server
   ```bash
   # Using live-server (with auto-reload)
   npm run dev
   
   # Alternative using http-server (more reliable but no auto-reload)
   npm run dev:http
   ```
   This will:
   - Watch for CSS changes and rebuild automatically
   - Start a local development server at http://localhost:3000
   - Auto-reload the page when files change (with live-server only)

4. If you only want specific tasks:
   ```bash
   # Only watch CSS changes
   npm run watch:css
   
   # Start live-server
   npm run serve
   
   # Start http-server (alternative)
   npm run serve:http
   ```

### Build for Production
Before deploying to GitHub Pages, build the minified CSS:

```bash
npm run build
```

## Deployment to GitHub Pages

1. Ensure you have the correct CNAME file for your domain.
2. Commit all changes to the main branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Pages will automatically deploy from your main branch.

## Project Structure

```
.
├── css/               # Legacy CSS files (transitioning to Tailwind)
├── dist/              # Compiled CSS output
├── js/                # JavaScript files
├── modules/           # DBT module pages
├── src/               # Source files for Tailwind
│   └── input.css      # Tailwind directives and custom styles
├── thinking-traps/    # Thinking traps content
├── tools/             # DBT tools and worksheets
├── index.html         # Main entry page
├── tailwind.config.js # Tailwind configuration
└── package.json       # Project dependencies and scripts
```

## Best Practices

- Always use the compiled CSS in production (`/dist/output.css`)
- Run `npm run build` before deploying to generate optimized CSS
- Keep the CSS organized in the `src/input.css` file
- Use consistent paths for assets (prefer absolute paths)

## License
ISC License - See LICENSE file for details.
