const { SYSTEM_PATHS } = require("./constants");

class error {
    constructor() {
        this.exec = require("child_process").exec;
        this.path = require("path");
        this.dialog = require("electron").dialog;
        this.app = require("electron").app;
        this.fs = require('fs');

        this.showErrorDialogs();
    }

    /**
     * Show error dialog and quit app
     * @param {String} title Dialog title
     * @param {String} message Error message
     */
    showErrorAndQuit(title, message) {
        this.dialog.showMessageBox({
            title: "Boost Changer",
            type: "error",
            message: title,
            detail: message,
            buttons: ["Ok"],
            icon: this.path.join(__dirname, "../public/icon/boostChanger.png")
        }).then((result) => {
            if (result.response === 0) {
                this.app.quit();
            }
        });
    }

    /**
     * Show all error dialogs based on system checks
     */
    showErrorDialogs() {
        // Check for VM (called from main.js now, but kept for backwards compatibility)
        this.exec("hostnamectl status | grep -m1 'Chassis' | awk '{ print $2 }'", (error, stdout, stderr) => {
            if (error) {
                console.error("Error checking VM status:", error);
                return;
            }
            
            if (stdout.includes("vm")) {
                this.showErrorAndQuit(
                    "Oh Sorry",
                    "It seems that you are using a VM. This App works only on a real machine."
                );
                return;
            }

            // Check for old Intel CPU (no intel_pstate support)
            if (!this.fs.existsSync(SYSTEM_PATHS.INTEL.TURBO)) {
                this.showErrorAndQuit(
                    "Oh Sorry",
                    "It seems that you have an old Intel CPU. This App works only on modern Intel CPUs or AMD processors."
                );
            }
        });
    }
}

module.exports = { error };
