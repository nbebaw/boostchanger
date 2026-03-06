// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer } = require("electron");
const { cpuSettings } = require("./cpu_settings") // CPU Settings
const { dashboard } = require("./dashboard") // Dashboard

/**
 * Apply a theme to the document
 * @param {Boolean} isDark True for dark theme
 */
function applyTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById("theme_toggle");
  if (btn) btn.textContent = isDark ? "Light" : "Dark";
}

window.addEventListener("DOMContentLoaded", async () => {
  // Load and apply persisted theme before rendering page classes
  let isDark = false;
  try {
    const settings = await ipcRenderer.invoke("readSettings");
    isDark = settings.darkMode === true;
  } catch (e) {
    console.error("Failed to read settings:", e);
  }
  applyTheme(isDark);

  // Wire up theme toggle button
  const themeToggle = document.getElementById("theme_toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", async () => {
      const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newDark = !currentlyDark;
      applyTheme(newDark);
      try {
        await ipcRenderer.invoke("writeSettings", { darkMode: newDark });
      } catch (e) {
        console.error("Failed to write settings:", e);
      }
    });
  }

  // close app if user hit close button
  const closeApp = document.getElementById("close");
  closeApp.addEventListener("click", () => {
    window.close();
  });

  var cpu = document.getElementById("cpu_settings");
  if (cpu) {
    new cpuSettings();
  } else {
    new dashboard();
  }
});
