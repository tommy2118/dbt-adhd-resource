/**
 * Main JavaScript file for The DBT Resource
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu handling (for all pages)
  const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Mobile menu handling (alternative style in thinking-traps)
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  if (mobileMenuButton) {
    const mobileMenuAlt = document.getElementById('mobile-menu');
    const menuOpenIcon = mobileMenuButton.querySelector('.menu-open');
    const menuCloseIcon = mobileMenuButton.querySelector('.menu-close');

    function toggleMobileMenu() {
      const isOpen = mobileMenuAlt.classList.contains('translate-x-0');
      if (isOpen) {
        mobileMenuAlt.classList.remove('translate-x-0');
        mobileMenuAlt.classList.add('translate-x-full');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.classList.remove('hidden');
          menuCloseIcon.classList.add('hidden');
        }
        document.body.style.overflow = '';
      } else {
        mobileMenuAlt.classList.add('translate-x-0');
        mobileMenuAlt.classList.remove('translate-x-full');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.classList.add('hidden');
          menuCloseIcon.classList.remove('hidden');
        }
        document.body.style.overflow = 'hidden';
      }
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }

  // Mobile category toggles (for thinking-traps)
  document.querySelectorAll('.mobile-category-button').forEach(button => {
    if (button) {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const arrow = button.querySelector('svg');
        if (arrow) arrow.classList.toggle('rotate-180');
        if (content) content.classList.toggle('hidden');
      });
    }
  });

  // Desktop category toggles (for thinking-traps)
  const desktopCategories = [
    { toggleId: 'desktop-perception-toggle', contentId: 'desktop-perception-content', iconId: 'desktop-perception-icon' },
    { toggleId: 'desktop-expectation-toggle', contentId: 'desktop-expectation-content', iconId: 'desktop-expectation-icon' },
    { toggleId: 'desktop-attribution-toggle', contentId: 'desktop-attribution-content', iconId: 'desktop-attribution-icon' },
    { toggleId: 'desktop-additional-toggle', contentId: 'desktop-additional-content', iconId: 'desktop-additional-icon' }
  ];
  
  desktopCategories.forEach(category => {
    const toggleButton = document.getElementById(category.toggleId);
    const content = document.getElementById(category.contentId);
    const icon = document.getElementById(category.iconId);
    if (toggleButton && content && icon) {
      toggleButton.addEventListener('click', () => {
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
      });
    }
  });

  // Mark current page in navigation
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop();
  document.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('text-purple-400', 'font-semibold');
    }
  });
});

