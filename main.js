// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu, dialog } = require('electron')
const path = require('path')
const windowStateKeeper = require('electron-window-state');
const appMenu = require('./mainMenu.js')
const fs = require('fs')

// define all important variables
let mainWindow, tray, trayMenu

// define tray
function trayApp() {
  tray = new Tray(path.join(__dirname, 'icon/boostChanger.png'));
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

// Definition (Error) dialogs
function errorDialog() {
  const { exec } = require("child_process");

  exec("cat /proc/cpuinfo | grep -m1 'vendor_id' | awk '{ print $3 }'", (stderr, stdout) => {
    // User has AMD CPU
    if (stderr instanceof Error) { throw stderr; }
    if (stdout.includes("AuthenticAMD")) {
      dialog.showMessageBox({
        title: "Boost Changer",
        type: "error",
        message: "Oh Sorry",
        detail: "It seems, that you have AMD cpu. This App works only now with Intel CPUs",
        buttons: ["Ok"],
        icon: path.join(__dirname, "icon/boostChanger.png")
      })

    } else {
      // User has an old Intel CPU
      exec("systemd-detect-virt", (stderr, stdout) => {
        if (stderr instanceof Error) { throw stderr; }
        if (stdout.includes("none")) {
          dialog.showMessageBox({
            title: "Boost Changer",
            type: "error",
            message: "Oh Sorry",
            detail: "It seems, that you have an old Intel CPU. This App works only now on a modern Intel CPUs",
            buttons: ["Ok"],
            icon: path.join(__dirname, "icon/boostChanger.png")
          })
        } else {
          // User uses VM
          dialog.showMessageBox({
            title: "Boost Changer",
            type: "error",
            message: "Oh Sorry",
            detail: "It seems, that you are using a VM. This App works only on a real Machine.",
            buttons: ["Ok"],
            icon: path.join(__dirname, "icon/boostChanger.png")
          }).then((ok) => {
            if (ok.response === 0) {
              app.quit()
            }
          })
        }
      })
    }
  })
}

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
    minWidth: 850,
    minHeight: 500,
    x: windowStateKeeper().x,
    y: windowStateKeeper().y,
    // resizable: false, //TODO for DEV
    title: 'Boost Changer',
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
    show: false, //When all the content of the app has been loaded, then the app will show up
    icon: path.join(__dirname, 'icon/boostChanger.png')
  })

  // When user minimize, the app will disappear 
  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  })

  // App Menu
  appMenu()

  // load the index.html of the app.
  mainWindow.loadFile('frontend/index.html')

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
// // TODO: for DEV
// app.on('ready', () => {
//   // call trayApp function
//   trayApp()
//   createWindow()
// })
// // TODO: Till here

//TODO: for production
app.on('ready', () => {
  //show error when the user uses VM 
  if (fs.existsSync('/sys/devices/system/cpu/intel_pstate/no_turbo')) {
    createWindow()
    // call trayApp function
    trayApp()
  } else {
    errorDialog()
  }
}) //TODO: Till here

// Definition (Help) dialog
function helpDialog() {
  dialog.showMessageBox({
    title: "Boost Changer",
    type: "info",
    message: "Help",
    detail: "If you faced any problem with Boost Changer Please open an issue Ticket in the gitlab repo",
    buttons: ["Ok"],
    icon: path.join(__dirname, "icon/boostChanger.png")
  })
}
module.exports = { helpDialog } // make this function as public 

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

// When app icon is clicked and app is running
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})