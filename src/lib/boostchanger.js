class boostchanger {
    constructor() {
        this.readline = require("readline")
        this.fs = require("fs")
        this.exec = require("child_process").exec
    }
    // exec function
    /**
     * Execute CMD commands 
     * @param {String} cmd 
     * @param {Function} callback 
     */
    os_func(cmd, callback) {
        this.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            callback(stdout)
        })
    }
    /**
     * This function is for intel turbo Boost 
     * @param {String} file turbo boost file in the kernel
     */
    turboBoost_Intel(file) {
        var no_turbo = this.readline.createInterface({
            input: this.fs.createReadStream(file),
        });
        // function checked which state has no_turbo 0 or 1 when user starts this app.
        no_turbo.on("line", (line) => {
            if (line == 0) {
                document.getElementById("turbo_toggle").checked = true;
            } else {
                document.getElementById("turbo_toggle").checked = false;
            }
            document.getElementById("toggle_change").addEventListener("change", () => {
                var turbo_toggle = document.getElementById("turbo_toggle");
                if (turbo_toggle.checked == false) {
                    this.os_func("echo 1 | pkexec tee " + file, () => {
                        // show notification after command is executed
                        new Notification("Boost Changer", {
                            body: "Turbo Boost is now OFF",
                        });
                    })
                } else {
                    this.os_func("echo 0 | pkexec tee " + file, () => {
                        // show notification after command is executed
                        new Notification("Boost Changer", {
                            body: "Turbo Boost is now ON",
                        });
                    })
                }
            });
        });
    }
    /**
     * This function is for AMD turbo Boost 
     * @param {String} file turbo boost file in the kernel
     */
    turboBoost_AMD(file) {
        var no_turbo = this.readline.createInterface({
            input: this.fs.createReadStream(file),
        });
        // function checked which state has no_turbo 0 or 1 when user starts this app.
        no_turbo.on("line", (line) => {
            if (line == 1) {
                document.getElementById("turbo_toggle").checked = true;
            } else {
                document.getElementById("turbo_toggle").checked = false;
            }
            document.getElementById("toggle_change").addEventListener("change", () => {
                var turbo_toggle = document.getElementById("turbo_toggle");
                if (turbo_toggle.checked == true) {
                    this.os_func("echo 1 | pkexec tee " + file, () => {
                        // show notification after command is executed
                        new Notification("Boost Changer", {
                            body: "Turbo Boost is now ON",
                        });
                    })
                } else {
                    this.os_func("echo 0 | pkexec tee " + file, () => {
                        // show notification after command is executed
                        new Notification("Boost Changer", {
                            body: "Turbo Boost is now OFF",
                        });
                    })
                }
            });
        });
    }
}

const lib = new boostchanger();

module.exports = { lib }