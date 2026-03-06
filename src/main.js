// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');
const { mainMenu } = require("./mainMenu");
const { error } = require("./error");
const { UI_CONFIG, SYSTEM_PATHS } = require("./constants");
const fs = require('fs');
const exec = require("child_process").exec;

// Define all important variables
let mainWindow, tray, trayMenu;

// Tray state — kept in sync via IPC from renderer
let trayState = {
  turboOn: null,      // true = turbo ON, false = turbo OFF, null = unknown
  perfMode: null      // label string e.g. 'Power Save', null = unknown
};

/**
 * Check if running in VM
 * @param {Function} callback Callback with boolean result
 */
function isRunningInVM(callback) {
  exec("hostnamectl status | grep -m1 'Chassis' | awk '{ print $2 }'", (error, stdout, stderr) => {
    if (error) {
      console.error(`VM check error: ${error}`);
      callback(false);
      return;
    }
    callback(stdout.includes("vm"));
  });
}

/**
 * Rebuild and apply the tray context menu from current trayState
 */
function rebuildTrayMenu() {
  const turboLabel = trayState.turboOn === null
    ? 'Turbo Boost: Unknown'
    : `Turbo Boost: ${trayState.turboOn ? 'ON' : 'OFF'}`;

  const perfModes = ['Power Save', 'Balance', 'Performance', 'Ultra'];

  trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
        mainWindow.setSkipTaskbar(false);
      }
    },
    { type: 'separator' },
    {
      label: turboLabel,
      click: () => {
        if (mainWindow) sendToCPUSettingsPage('tray-toggle-turbo');
      }
    },
    {
      label: 'Performance Mode',
      submenu: perfModes.map((mode) => ({
        label: mode,
        type: 'radio',
        checked: trayState.perfMode === mode,
        click: () => {
          if (mainWindow) sendToCPUSettingsPage('tray-set-perf', mode);
        }
      }))
    },
    { type: 'separator' },
    {
      label: 'Exit',
      role: 'quit'
    }
  ]);

  tray.setContextMenu(trayMenu);
}

/**
 * Ensure the CPU settings page is loaded, then send an IPC message to it.
 * Tray actions (turbo toggle, perf mode) require the CPU settings DOM to exist.
 * @param {String} channel IPC channel name
 * @param {*} payload Optional payload
 */
function sendToCPUSettingsPage(channel, payload) {
  const cpuSettingsUrl = 'file://' + path.join(__dirname, '../public/cpu_settings.html');
  const currentUrl = mainWindow.webContents.getURL();

  const send = () => {
    if (payload !== undefined) {
      mainWindow.webContents.send(channel, payload);
    } else {
      mainWindow.webContents.send(channel);
    }
  };

  if (currentUrl.includes('cpu_settings.html')) {
    // Already on the right page — send immediately
    send();
  } else {
    // Navigate to CPU settings, then send once loaded.
    // A short delay after did-finish-load is needed because the preload script
    // uses an async DOMContentLoaded handler (awaits readSettings) before
    // instantiating cpuSettings and registering ipcRenderer listeners.
    mainWindow.loadFile(path.join(__dirname, '../public/cpu_settings.html'));
    mainWindow.webContents.once('did-finish-load', () => {
      setTimeout(send, UI_CONFIG.TRAY_ACTION_DELAY);
    });
    // Make sure the window is visible so the user sees the result
    mainWindow.show();
    mainWindow.setSkipTaskbar(false);
  }
}

/**
 * Initialize system tray
 */
function initTray() {
  tray = new Tray(path.join(__dirname, '../public/icon/boostChanger.png'));
  tray.setToolTip('Boost Changer');
  rebuildTrayMenu();
}

/**
 * Create the main application window
 */
function createWindow() {
  // Check for updates (skip for Arch Linux)
  if (!fs.existsSync(SYSTEM_PATHS.ARCH_RELEASE)) {
    const updater = require('./updater.js');
    setTimeout(updater, UI_CONFIG.UPDATER_DELAY);
  } else {
    console.log("Looking for update? See AUR");
  }

  // Initialize window state keeper
  const mainWindowState = windowStateKeeper({
    defaultWidth: 850,
    defaultHeight: 500
  });

  // Create the main window
  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 850,
    minHeight: 500,
    x: mainWindowState.x,
    y: mainWindowState.y,
    title: 'Boost Changer',
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false
    },
    show: false,
    icon: path.join(__dirname, '../public/icon/boostChanger.png')
  });

  // When user minimizes, immediately hide to tray and remove from taskbar.
  // Do NOT call event.preventDefault() — on Wayland it is a no-op and the
  // window minimizes anyway. Instead we let the minimize complete, then hide.
  mainWindow.on('minimize', () => {
    mainWindow.setSkipTaskbar(true);
    mainWindow.hide();
  });

  // Initialize app menu
  new mainMenu();

  // Load the index.html of the app
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  // Show window when ready
  mainWindow.once('ready-to-show', () => mainWindow.show());

  // NOTE: Uncomment for development only
  // mainWindow.webContents.openDevTools();

  // Manage window state
  mainWindowState.manage(mainWindow);

  // Close app when window is closed
  mainWindow.on('close', () => app.quit());

  // Garbage collection
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


// This method will be called when Electron has finished initialization
app.on('ready', () => {
  isRunningInVM((isVM) => {
    if (!isVM) {
      createWindow();
      initTray();
    } else {
      new error();
    }
  });

  // Handle dialog requests from renderer process
  ipcMain.handle("showDialog", (e, message) => {
    const config = {
      type: "info",
      buttons: ["Ok"],
      title: "CPU Settings",
      message: 'Oh Sorry',
      detail: message,
      icon: path.join(__dirname, "../public/icon/boostChanger.png")
    };
    dialog.showMessageBox(mainWindow, config);
  });

  // Handle tray state updates from renderer process
  ipcMain.on("updateTrayState", (e, state) => {
    if (typeof state.turboOn === 'boolean') trayState.turboOn = state.turboOn;
    if (typeof state.perfMode === 'string') trayState.perfMode = state.perfMode;
    if (tray) rebuildTrayMenu();
  });

  // Settings file path in user data directory
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');

  /**
   * Read settings from disk; returns {} on missing/corrupt file
   */
  ipcMain.handle("readSettings", () => {
    try {
      if (fs.existsSync(settingsPath)) {
        return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      }
    } catch (e) {
      console.error("readSettings error:", e);
    }
    return {};
  });

  /**
   * Write/merge settings to disk
   * @param {Object} updates Key-value pairs to merge into settings
   */
  ipcMain.handle("writeSettings", (e, updates) => {
    try {
      let current = {};
      if (fs.existsSync(settingsPath)) {
        current = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      }
      const merged = Object.assign(current, updates);
      fs.writeFileSync(settingsPath, JSON.stringify(merged, null, 2), 'utf8');
    } catch (e) {
      console.error("writeSettings error:", e);
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});

// When app icon is clicked and app is running
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
