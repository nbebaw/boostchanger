class mainMenu {
    constructor() {
        this.Menu = require("electron").Menu
        this.dialog = require("electron").dialog
        this.path = require("path")
        this.appVersion = "v" + require("../package.json").version
        this.appDescription = require("../package.json").description

        this.menuTemplate()
    }
    // Definition (Help) dialog
    helpDialog() {
        this.dialog.showMessageBox({
            title: "Boost Changer",
            type: "info",
            message: "Help",
            detail: "If you faced any problem with Boost Changer Please open an issue Ticket in the github repo",
            buttons: ["Ok"],
            icon: this.path.join(__dirname, "../public/icon/boostChanger.png")
        })
    }
    menuTemplate() {
        let template = [
            {
                label: "File",
                submenu: [
                    {
                        label: "About",
                        click: () => {
                            this.dialog.showMessageBox({
                                type: "info",
                                buttons: ["Ok"],
                                title: "About",
                                message: `Boost Changer ${this.appVersion}`,
                                detail: `${this.appDescription}`,
                                icon: this.path.join(__dirname, "../public/icon/boostChanger.png")
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
                    this.helpDialog()
                }
            },
        ];
        let menu = this.Menu.buildFromTemplate(template)

        this.Menu.setApplicationMenu(menu)
    }
}
module.exports = { mainMenu }
