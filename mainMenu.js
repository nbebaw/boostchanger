const { Menu, dialog } = require('electron')
const path = require('path')
module.exports = () => {

    let template = [
        {
            label: "File",
            submenu: [
                {
                    label: "About",
                    click: () => {
                        dialog.showMessageBox({
                            type: "info",
                            buttons: ["Ok"],
                            title: "About",
                            message: "Boost Changer v4.1.4",
                            detail: "With this app you can control CPU turbo boost and the settings of the cpu speed in order to consuming less battery voltage. \nThis app is made by nbebaw",
                            icon: path.join(__dirname, "icon/boostChanger.png")
                            
                        })
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: 'close',
                    role: 'quit',
                    accelerator: "Control+Q"
                }],
        },
        { label: '|' },
        {
            label: 'Help', click: () => {
                const helpWindow = require("./main.js")
                helpWindow.helpDialog()
            }
        },
    ];
    let menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(menu)
}

