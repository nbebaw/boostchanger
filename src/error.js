class error {
    constructor() {
        this.exec = require("child_process").exec
        this.path = require("path")
        this.dialog = require("electron").dialog
        this.app = require("electron").app
        this.fs = require('fs')

        this.errorDialog()
    }

    // Definition (Error) dialogs
    errorDialog() {
        // User uses a vm 
        this.exec("hostnamectl status | grep -m1 'Chassis' | awk '{ print $2 }'", (stderr, stdout) => {
            if (stderr instanceof Error) { throw stderr; }
            if (stdout.includes("vm")) {
                this.dialog.showMessageBox({
                    title: "Boost Changer",
                    type: "error",
                    message: "Oh Sorry",
                    detail: "It seems, that you are using a VM. This App works only on a real Machine.",
                    buttons: ["Ok"],
                    icon: this.path.join(__dirname, "../public/icon/boostChanger.png")
                }).then((ok) => {
                    if (ok.response === 0) {
                        this.app.quit()
                    }
                })
            }
        })
        // User has an old Intel CPU
        if (!this.fs.existsSync('/sys/devices/system/cpu/intel_pstate/no_turbo')) {
            this.dialog.showMessageBox({
                title: "Boost Changer",
                type: "error",
                message: "Oh Sorry",
                detail: "It seems, that you have an old Intel CPU. This App works only now on a modern Intel CPUs",
                buttons: ["Ok"],
                icon: this.path.join(__dirname, "../public/icon/boostChanger.png")
            }).then((ok) => {
                if (ok.response === 0) {
                    this.app.quit()
                }
            })
        }
    }
}

module.exports = { error }