/**
 * Farmácia UFMG Design System
 * Version 2025.04
 */

const FFDS = {
  /**
   * Initializes interactive components
   */
  init() {
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
  }
};

window.FFDS = FFDS;

document.addEventListener('DOMContentLoaded', () => {
  FFDS.init();
});
