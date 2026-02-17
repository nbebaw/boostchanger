const { SYSTEM_PATHS, CPU_VENDORS, UI_CONFIG } = require("./constants");

class cpuSettings {
  constructor() {
    this.sys_info = require("systeminformation");
    this.boostchanger = require("./lib/boostchanger").lib;
    this.intelOrAMDText = document.getElementById("amdOrIntel");
    this.updateIntervalId = null;
    
    this.initialize();
  }

  /**
   * Initialize CPU settings
   */
  initialize() {
    this.detectCPUVendor();
    this.startCPUSpeedMonitoring();
  }

  /**
   * Detect CPU vendor and setup appropriate controls
   */
  detectCPUVendor() {
    this.boostchanger.os_func(
      "cat /proc/cpuinfo | grep -m1 'vendor_id' | awk '{ print $3 }'",
      (vendor) => {
        const vendorName = vendor.trim();
        
        if (vendorName === CPU_VENDORS.INTEL) {
          this.setupIntelControls();
          this.intelOrAMDText.innerHTML = "Intel";
        } else if (vendorName === CPU_VENDORS.AMD) {
          this.setupAMDControls();
          this.intelOrAMDText.innerHTML = "AMD";
        } else {
          console.error("Unknown CPU vendor:", vendorName);
        }
      }
    );
  }

  /**
   * Setup Intel CPU controls
   */
  setupIntelControls() {
    this.boostchanger.turboBoost_Intel(SYSTEM_PATHS.INTEL.TURBO);
    this.boostchanger.perf_settings_intel(SYSTEM_PATHS.INTEL.PERF);
  }

  /**
   * Setup AMD CPU controls
   */
  setupAMDControls() {
    this.boostchanger.turboBoost_AMD(SYSTEM_PATHS.AMD.TURBO);
    this.boostchanger.perf_settings_AMD(
      SYSTEM_PATHS.AMD.PERF_SINGLE,
      SYSTEM_PATHS.AMD.PERF_ALL
    );
  }

  /**
   * Update CPU speed display
   */
  updateCPUSpeed() {
    this.sys_info.cpuCurrentSpeed().then((cpu_speed) => {
      const cpuSpeedInMHz = (cpu_speed.avg * 1000).toFixed(0);
      const cpuMHzElement = document.getElementById("cpu_MHz");
      
      if (cpuMHzElement) {
        cpuMHzElement.innerHTML = cpuSpeedInMHz + " MHz";
      }
    }).catch(error => {
      console.error("Error fetching CPU speed:", error);
    });
  }

  /**
   * Start monitoring CPU speed with interval
   */
  startCPUSpeedMonitoring() {
    // Get initial CPU speed
    this.updateCPUSpeed();
    
    // Update CPU speed periodically
    this.updateIntervalId = setInterval(() => {
      this.updateCPUSpeed();
    }, UI_CONFIG.CPU_SPEED_UPDATE_INTERVAL);
  }

  /**
   * Stop CPU speed monitoring
   */
  stopCPUSpeedMonitoring() {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
      this.updateIntervalId = null;
    }
  }
}

module.exports = { cpuSettings };
