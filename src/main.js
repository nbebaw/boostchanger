// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')
const windowStateKeeper = require('electron-window-state');
const { mainMenu } = require("./mainMenu")
const { error } = require("./error")
const fs = require('fs')

// define all important variables
let mainWindow, tray, trayMenu

// define tray
function trayApp() {
  tray = new Tray(path.join(__dirname, '../public/icon/boostChanger.png'));
  tray.setToolTip('Boost Changer');
  trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Exit', role: 'quit'
    },
  ])
  tray.setContextMenu(trayMenu);
} //End Tray

function createWindow() {

  //Check if the OS is ARCH Linux
  if (fs.existsSync('/etc/arch-release')) {
    console.log("Looking for update? see AUR");
  } else {
    // Check for app update after 3 seconds if the OS is not ARCH Linux
    const updater = require('./updater.js')
    setTimeout(updater, 3000)
  }
  // Create the main window.
  mainWindow = new BrowserWindow({
    width: 850,
    height: 500,
    minWidth: 850,
    minHeight: 500,
    x: windowStateKeeper().x,
    y: windowStateKeeper().y,
    title: 'Boost Changer',
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },

    show: false, //When all the content of the app has been loaded, then the app will show up
    icon: path.join(__dirname, '../public/icon/boostChanger.png')
  })


  // When user minimize, the app will disappear 
  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  })

  // App Menu
  new mainMenu()
  // load the index.html of the app.
  mainWindow.loadFile(__dirname + './../public/index.html')

  // When all the content of the app has been loaded, then the app will show up
  mainWindow.once('ready-to-show', mainWindow.show)

  // TODO: for DEV Open the DevTools. 
  // mainWindow.webContents.openDevTools()

  // clear all local storage data before app starts
  mainWindow.webContents.session.clearStorageData()

  // manage winState for the main Window
  windowStateKeeper().manage(mainWindow)

  //the entire App will close
  mainWindow.on('close', () => { app.quit(); });

  //Garbage collection handle
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', () => {
  //show error when the user uses VM 
  if (fs.existsSync('/sys/devices/system/cpu/intel_pstate/no_turbo')) {
    createWindow()
    // call trayApp function
    trayApp()
  } else {
    new error()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

// When app icon is clicked and app is running
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})