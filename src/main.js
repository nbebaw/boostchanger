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
 * Initialize system tray
 */
function initTray() {
  tray = new Tray(path.join(__dirname, '../public/icon/boostChanger.png'));
  tray.setToolTip('Boost Changer');
  
  trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => mainWindow.show()
    },
    {
      label: 'Exit',
      role: 'quit'
    }
  ]);
  
  tray.setContextMenu(trayMenu);
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
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false
    },
    show: false,
    icon: path.join(__dirname, '../public/icon/boostChanger.png')
  });

  // When user minimizes, hide the app to tray
  mainWindow.on('minimize', (event) => {
    event.preventDefault();
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

  // Clear all local storage data before app starts
  mainWindow.webContents.session.clearStorageData();

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
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});

// When app icon is clicked and app is running
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
