// scripts/common.js
export function initCommon() {
  // Footer year
  const yearSpan = document.getElementById('currentyear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Last modified
  const lastModified = document.getElementById('lastModified');
  if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
  }

  // Navigation
  const menuButton = document.getElementById('menuButton');
  const primaryNav = document.getElementById('primaryNav');

  if (menuButton && primaryNav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
  }
}
