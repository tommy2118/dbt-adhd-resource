/**
 * Enhanced UI functionality for DBT ADHD Resource
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize reading progress bar on content pages
  initReadingProgress();
  
  // Active navigation state
  highlightCurrentNavItem();
});

/**
 * Creates and initializes a reading progress bar
 */
function initReadingProgress() {
  // Only add reading progress on content pages with substantial content
  if (document.querySelector('main') && document.querySelector('main').textContent.length > 1000) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'reading-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
}

/**
 * Ensures the correct navigation item is highlighted
 */
function highlightCurrentNavItem() {
  // Get current page path
  const currentPath = window.location.pathname;
  
  // Find all navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Check each link against current path
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if this is the current page
    if (currentPath.endsWith(linkPath)) {
      link.setAttribute('aria-current', 'page');
    } else if (linkPath === '../index.html' && currentPath.endsWith('/')) {
      link.setAttribute('aria-current', 'page');
    } else if (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('/index.html'))) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
