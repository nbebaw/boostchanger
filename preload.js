// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const cpu_settings = require("./scripts/cpu_settings"); // CPU Settings
const dashboard = require("./scripts/dashboard"); // Dashboard

window.addEventListener("DOMContentLoaded", () => {
  var cpu = document.getElementById("cpu_settings");
  if (cpu) {
    cpu_settings();
  } else {
    dashboard();
  }
});