class boostchanger {
    constructor() {
        this.readline = require("readline")
        this.fs = require("fs")
    }
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
                    this.os_func("echo 0 | pkexec tee " + file, () => {
                        // show notification after command is executed
                        new Notification("Boost Changer", {
                            body: "Turbo Boost is now OFF",
                        });
                    })
                } else {
                    this.os_func("echo 1 | pkexec tee " + file, () => {
                        // show notification after command is executed
                        new Notification("Boost Changer", {
                            body: "Turbo Boost is now ON",
                        });
                    })
                }
            });
        });
    }
}

const lib = new boostchanger();

module.exports = { lib }