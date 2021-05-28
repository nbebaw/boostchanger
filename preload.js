// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const cpu_settings = require("./scripts/cpu_settings"); // CPU Settings
const dashboard = require("./scripts/dashboard"); // Dashboard

window.addEventListener("DOMContentLoaded", () => {
  // close app if user hit close button
  const closeApp = document.getElementById("close");
  closeApp.addEventListener("click", () => {
    window.close();
  });
  var cpu = document.getElementById("cpu_settings");
  if (cpu) {
    cpu_settings();
  } else {
    dashboard();
  }
});
