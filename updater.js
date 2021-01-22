const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

// Configure log debugging
// autoUpdater.logger = require('electron-log')
// autoUpdater.logger.transports.file.level = "info"

// Disable auto downloading of updates
autoUpdater.autoDownload = false

// Single export to check for and apply any available updates
module.exports = () => {

    // Check for update (GH Releases)
    autoUpdater.checkForUpdates()

    // Listen for update found
    autoUpdater.on('update-available', () => {

        // Prompt user to start download
        dialog.showMessageBox({
            type: 'info',
            title: 'Update available',
            message: 'A new version of Boost Changer is available. Do you want to update now?',
            buttons: ['Update', 'No']
        }).then( result => {
            let buttonIndex = result.response

            // If button 0 (update), start downloading the update
            if ( buttonIndex === 0 ) {
                autoUpdater.downloadUpdate()
            }
        })
        // autoUpdater.downloadUpdate()
    })
    // Listen for update downloaded
    autoUpdater.on('update-downloaded', () => {

        // Prompt the user to install the update
        dialog.showMessageBox({
            type: "info",
            title: "Update ready",
            message: "Install & restart now?",
            buttons: ['Yes', 'Later']
        }).then( result => {
            let buttonIndex = result.response

            // Install & restart if button 0 (Yes)
            if ( buttonIndex === 0 ) autoUpdater.quitAndInstall(false, true)
        })
    })
}