import { createIcons, icons } from 'lucide';

/**
 * Farmácia UFMG Design System
 * Version 2026.05.06
 */

const FFDS = {
  /**
   * Initializes interactive components
   */
  init() {
    this.initDropdowns();
    this.initSidebar();
    createIcons({ icons });
    console.log("Farmácia UFMG Design System v2026.05.06 loaded.");
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
   * Toggles sidebar visibility
   */
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (window.innerWidth < 768) {
      // Mobile drawer toggle
      if (sidebar) sidebar.classList.toggle('show');
      if (overlay) overlay.classList.toggle('show');
    } else {
      // Desktop collapse toggle
      if (sidebar) sidebar.classList.toggle('sidebar-collapsed');
    }
  },

  /**
   * Initializes sidebar and responsive listeners
   */
  initSidebar() {
    // Add click listeners to overlays
    document.addEventListener('click', (e) => {
      if (e.target.matches('.sidebar-overlay')) {
        this.toggleSidebar();
      }
      
      // Close sidebar when clicking links on mobile
      if (window.innerWidth < 768 && e.target.closest('.sidebar-link')) {
        this.toggleSidebar();
      }
    });
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

FFDS.createIcons = createIcons;
FFDS.icons = icons;

window.FFDS = FFDS;

document.addEventListener('DOMContentLoaded', () => {
  FFDS.init();
});
