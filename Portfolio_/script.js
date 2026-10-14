


const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

/**
 * Applies the chosen theme to the page.
 * - Adds/removes the "dark" class on <body> (CSS variables handle the colors)
 * - Updates aria-checked so screen readers know whether the switch is on
 * @param {string} theme - either "dark" or "light"
 */
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    toggleButton.setAttribute("aria-checked", "true");  // switch is ON
  } else {
    body.classList.remove("dark");
    toggleButton.setAttribute("aria-checked", "false"); // switch is OFF
  }
}

/**
 * Reads the visitor's saved theme from localStorage.
 * try/catch keeps the page working even if storage is blocked.
 * @returns {string|null} "dark", "light", or null if nothing is saved
 */
function getSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}

/**
 * Saves the visitor's theme choice so it is remembered next visit.
 * @param {string} theme - either "dark" or "light"
 */
function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Ignore storage errors; the switch still works for this visit
  }
}

// On page load, use the saved theme if there is one.
// Otherwise, follow the visitor's operating system setting.
const savedTheme = getSavedTheme();

if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

// When the switch is clicked, flip the theme and remember the choice
toggleButton.addEventListener("click", function () {
  const newTheme = body.classList.contains("dark") ? "light" : "dark";
  applyTheme(newTheme);
  saveTheme(newTheme);
});