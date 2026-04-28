/**
 * Farmácia UFMG Design System
 * Version 2025.04
 */

const FFDS = {
  /**
   * Initializes interactive components
   */
  init() {
    this.initDropdowns();
    console.log("Farmácia UFMG Design System loaded.");
  },

  /**
   * Toggles dark mode class on the document element
   */
  toggleDarkMode(force) {
    if (force !== undefined) {
      document.documentElement.classList.toggle('ffds-dark', force);
      document.documentElement.classList.toggle('ffds-light', !force);
    } else {
      const isDark = document.documentElement.classList.toggle('ffds-dark');
      document.documentElement.classList.toggle('ffds-light', !isDark);
    }
  },

  /**
   * Toggles sidebar visibility on mobile
   */
  toggleSidebar() {
    const sidebar = document.querySelector('.ffds-sidebar');
    const overlay = document.querySelector('.ffds-sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('ffds-open');
    if (overlay) overlay.classList.toggle('ffds-show');
  },

  /**
   * Initializes dropdown toggles
   */
  initDropdowns() {
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('.ffds-dropdown-toggle');
      const dropdown = e.target.closest('.ffds-dropdown');
      
      // Close all other dropdowns
      document.querySelectorAll('.ffds-dropdown.ffds-open').forEach(openDropdown => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove('ffds-open');
        }
      });

      if (toggle && dropdown) {
        e.preventDefault();
        dropdown.classList.toggle('ffds-open');
      } else if (!dropdown) {
        // Clicked outside, close all
        document.querySelectorAll('.ffds-dropdown.ffds-open').forEach(openDropdown => {
          openDropdown.classList.remove('ffds-open');
        });
      }
    });
  }
};

window.FFDS = FFDS;

document.addEventListener('DOMContentLoaded', () => {
  FFDS.init();
});
