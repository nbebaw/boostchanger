const { ipcRenderer } = require("electron");
const { PERFORMANCE_MODES } = require("../constants");

class boostchanger {
    constructor() {
        this.readline = require("readline");
        this.fs = require("fs");
        this.exec = require("child_process").exec;
        this.dialog = require("electron").dialog;
        this.turboToggleAttached = false;
        this.perfButtonsAttached = false;
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
            callback(stdout);
        });
    }

    /**
     * Show dialog when mode is already active
     * @param {String} mode Current mode name
     */
    showAlreadyActiveDialog(mode) {
        ipcRenderer.invoke("showDialog", `The actual CPU preference is already ${mode}`);
    }

    /**
     * Show notification
     * @param {String} message Notification message
     */
    showNotification(message) {
        new Notification("Boost Changer", { body: message });
    }

    /**
     * Read file and execute callback with content
     * @param {String} filePath Path to file
     * @param {Function} callback Callback with file content
     */
    readFileContent(filePath, callback) {
        const reader = this.readline.createInterface({
            input: this.fs.createReadStream(filePath)
        });
        
        reader.on("line", (line) => {
            callback(line.trim());
            reader.close();
        });
    }

    /**
     * Write value to system file using pkexec
     * @param {String} value Value to write
     * @param {String} filePath Path to system file
     * @param {Function} callback Success callback
     */
    writeSystemFile(value, filePath, callback) {
        this.os_func(`echo ${value} | pkexec tee ${filePath}`, callback);
    }

    /**
     * Unified turbo boost control for Intel and AMD
     * @param {String} file Turbo boost file path
     * @param {Boolean} isIntel True for Intel, false for AMD
     */
    turboBoost(file, isIntel) {
        // Prevent multiple event listener attachments
        if (this.turboToggleAttached) return;

        this.readFileContent(file, (line) => {
            const turboToggle = document.getElementById("turbo_toggle");
            
            // Intel: 0=ON, 1=OFF | AMD: 1=ON, 0=OFF
            turboToggle.checked = isIntel ? (line === "0") : (line === "1");

            // Attach event listener only once
            document.getElementById("toggle_change").addEventListener("change", () => {
                const isChecked = turboToggle.checked;
                const valueToWrite = isIntel 
                    ? (isChecked ? "0" : "1") 
                    : (isChecked ? "1" : "0");
                const message = isChecked ? "Turbo Boost is now ON" : "Turbo Boost is now OFF";

                this.writeSystemFile(valueToWrite, file, () => {
                    this.showNotification(message);
                });
            });

            this.turboToggleAttached = true;
        });
    }

    /**
     * Setup performance mode buttons
     * @param {String} filePath Path to performance control file
     * @param {Object} modes Performance modes configuration
     * @param {String} allCPUsPath Path for all CPUs (AMD only)
     */
    setupPerformanceModes(filePath, modes, allCPUsPath = null) {
        // Prevent multiple event listener attachments
        if (this.perfButtonsAttached) return;

        const badgeTag = document.getElementById("bdg");
        const targetPath = allCPUsPath || filePath;

        // Read current mode
        this.readFileContent(filePath, (line) => {
            const currentValue = line;
            
            // Determine current mode
            for (const [key, config] of Object.entries(modes)) {
                if (String(config.value) === String(currentValue)) {
                    badgeTag.innerHTML = ` ${config.label}`;
                    break;
                }
            }
        });

        // Setup button click handlers
        const buttons = {
            'btn-save': 'POWER_SAVE',
            'btn-balance': 'BALANCE',
            'btn-perf': 'PERFORMANCE',
            'btn-ultra': 'ULTRA'
        };

        for (const [btnId, modeKey] of Object.entries(buttons)) {
            document.getElementById(btnId).addEventListener("click", () => {
                const currentMode = badgeTag.innerHTML.trim();
                const targetMode = modes[modeKey];

                if (currentMode === targetMode.label) {
                    this.showAlreadyActiveDialog(currentMode);
                } else {
                    this.writeSystemFile(targetMode.value, targetPath, () => {
                        this.showNotification(`Mode: ${targetMode.label}`);
                        badgeTag.innerHTML = ` ${targetMode.label}`;
                    });
                }
            });
        }

        this.perfButtonsAttached = true;
    }

    /**
     * This function is for Intel turbo Boost 
     * @param {String} file turbo boost file in the kernel
     */
    turboBoost_Intel(file) {
        this.turboBoost(file, true);
    }

    /**
     * This function is for AMD turbo Boost 
     * @param {String} file turbo boost file in the kernel
     */
    turboBoost_AMD(file) {
        this.turboBoost(file, false);
    }

    /**
     * Change performance settings for Intel CPUs
     * @param {String} file cpufreq file in the kernel
     */
    perf_settings_intel(file) {
        this.setupPerformanceModes(file, PERFORMANCE_MODES.INTEL);
    }

    /**
     * Change performance settings for AMD CPUs
     * @param {String} file cpufreq file in the kernel for one CPU
     * @param {String} allCPUs cpufreq file in the kernel for all CPUs
     */
    perf_settings_AMD(file, allCPUs) {
        this.setupPerformanceModes(file, PERFORMANCE_MODES.AMD, allCPUs);
    }
}

const lib = new boostchanger();

module.exports = { lib };
