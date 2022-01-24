class mainMenu {
    constructor() {
        const { Menu, dialog } = require('electron')
        const path = require('path')
        var appVersion = "v" + require("../package.json").version;
        var appDescription = require("../package.json").description;
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
                                message: `Boost Changer ${appVersion}`,
                                detail: `${appDescription}`,
                                icon: path.join(__dirname, "../public/icon/boostChanger.png")
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
}
module.exports = { mainMenu }
