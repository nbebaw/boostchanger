const { ipcRenderer } = require("electron");
class boostchanger {
    constructor() {
        this.readline = require("readline")
        this.fs = require("fs")
        this.exec = require("child_process").exec
        this.dialog = require("electron").dialog
    }

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
     * 
     * @param {String} badgeTag for Example: Ultra, Balance etc.. 
     */
    already_clicked(bdg) {
        ipcRenderer.invoke("showDialog", `The actual CPU preferences is already ${bdg}`);
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

    /**
    * change preferences settings of CPU
    * @param {String} file cpufreq file in the kernel
    */
    perf_settings_intel(file) {
        var badgeTag = document.getElementById("bdg");
        var max_perf = this.readline.createInterface({
            input: this.fs.createReadStream(
                file
            ),
        });
        // function checked which state has no_turbo 0 or 1 when user starts this app.
        max_perf.on("line", (line) => {
            if (line == 30) {
                badgeTag.innerHTML = " Power Save";
            } else if (line == 50) {
                badgeTag.innerHTML = " Balance";
            } else if (line == 70) {
                badgeTag.innerHTML = " Performance";
            } else {
                badgeTag.innerHTML = " Ultra";
            }
        });
        document.getElementById("btn-save").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Power Save") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo 30 | pkexec tee " + file, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Power Save",
                    });
                    badgeTag.innerHTML = " Power Save"
                })
            }
        });
        document.getElementById("btn-balance").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Balance") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo 50 | pkexec tee " + file, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Balance",
                    });
                    badgeTag.innerHTML = " Balance"
                })
            }
        });
        document.getElementById("btn-perf").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Performance") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo 70 | pkexec tee " + file, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Performance",
                    });
                    badgeTag.innerHTML = " Performance"
                })
            }
        });
        document.getElementById("btn-ultra").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Ultra") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo 100 | pkexec tee " + file, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Ultra",
                    });
                    badgeTag.innerHTML = " Ultra"
                })
            }
        });
    }

    /**
    * change preferences settings of CPU
    * @param {String} file cpufreq file in the kernel for one CPU
    * @param {String} allCPUs cpufreq file in the kernel for all CPUs
    */
    perf_settings_AMD(file, allCPUs) {
        var badgeTag = document.getElementById("bdg");
        var max_perf = this.readline.createInterface({
            input: this.fs.createReadStream(
                file
            ),
        });
        // function checked which state has no_turbo 0 or 1 when user starts this app.
        max_perf.on("line", (line) => {
            if (line == "conservative") {
                badgeTag.innerHTML = " Power Save";
            } else if (line == "powersave") {
                badgeTag.innerHTML = " Balance";
            } else if (line == "performance") {
                badgeTag.innerHTML = " Performance";
            } else {
                badgeTag.innerHTML = " Ultra";
            }
        });
        document.getElementById("btn-save").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Power Save") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo conservative | pkexec tee " + allCPUs, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Power Save",
                    });
                    badgeTag.innerHTML = " Power Save"
                })
            }
        });
        document.getElementById("btn-balance").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Balance") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo powersave | pkexec tee " + allCPUs, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Balance",
                    });
                    badgeTag.innerHTML = " Balance"
                })
            }
        });
        document.getElementById("btn-perf").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Performance") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo performance | pkexec tee " + allCPUs, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Performance",
                    });
                    badgeTag.innerHTML = " Performance"
                })
            }
        });
        document.getElementById("btn-ultra").addEventListener("click", () => {
            var bdg = (badgeTag.innerHTML).trim();
            if (bdg == "Ultra") {
                this.already_clicked(bdg)
            } else {
                this.os_func("echo schedutil | pkexec tee " + allCPUs, () => {
                    // show notification after command is executed
                    new Notification("Boost Changer", {
                        body: "Mode: Ultra",
                    });
                    badgeTag.innerHTML = " Ultra"
                })
            }
        });
    }
}

const lib = new boostchanger();

module.exports = { lib }