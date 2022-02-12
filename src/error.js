class error {
    constructor() {
        this.exec = require("child_process").exec
        this.path = require("path")
        this.dialog = require("electron").dialog
        this.app = require("electron").app

        this.errorDialog()
    }

    // Definition (Error) dialogs
    errorDialog() {
        this.exec("cat /proc/cpuinfo | grep -m1 'vendor_id' | awk '{ print $3 }'", (stderr, stdout) => {
            // User has AMD CPU
            if (stderr instanceof Error) { throw stderr; }
            if (stdout.includes("AuthenticAMD")) {
                this.dialog.showMessageBox({
                    title: "Boost Changer",
                    type: "error",
                    message: "Oh Sorry",
                    detail: "It seems, that you have AMD cpu. This App works only now with Intel CPUs",
                    buttons: ["Ok"],
                    icon: this.path.join(__dirname, "../public/icon/boostChanger.png")
                }).then((ok) => {
                    if(ok.response === 0) {
                        this.app.quit()
                    }
                })

            } else {
                // User has an old Intel CPU
                this.exec("systemd-detect-virt", (stderr, stdout) => {
                    if (stderr instanceof Error) { throw stderr; }
                    if (stdout.includes("none")) {
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
                    } else {
                        // User uses VM
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
            }
        })
    }
}

module.exports = { error }