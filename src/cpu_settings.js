class cpuSettings {
  constructor() {
    this.sys_info = require("systeminformation")
    this.boostchanger = require("./lib/boostchanger").lib
    this.intelOrAMD()
    this.getCpuSpeed()
  }
  /**
   * This function is to indicate if the user has intel or AMD Processor.
   */
  intelOrAMD() {
    this.boostchanger.os_func("cat /proc/cpuinfo | grep -m1 'vendor_id' | awk '{ print $3 }'", (vendor) => {
      // show notification after command is executed
      var vendor_name = vendor.trim();
      if (vendor_name == "GenuineIntel") {
        this.boostchanger.turboBoost_Intel("/sys/devices/system/cpu/intel_pstate/no_turbo");
        this.boostchanger.perf_settings_intel("/sys/devices/system/cpu/intel_pstate/max_perf_pct");
      } else {
        this.boostchanger.turboBoost_AMD("/sys/devices/system/cpu/cpufreq/boost");
        this.boostchanger.perf_settings_AMD("/sys/devices/system/cpu/cpu*/cpufreq/scaling_governor");
      }
    })
  }
  /**
   * Get the average CPU Speed and print it to the user
   */
  getCpuSpeed() {
    // Get CPU speed for the first time
    this.sys_info.cpuCurrentSpeed().then((cpu_speed) => {
      var cpu_speedInMHz = cpu_speed.avg * 1000;
      document.getElementById("cpu_MHz").innerHTML = cpu_speedInMHz + " MHz";
    });
    // CPU speed with interval
    setInterval(() => {
      this.sys_info.cpuCurrentSpeed().then((cpu_speed) => {
        var cpu_speedInMHz = cpu_speed.avg * 1000; //cpu_speed.avg = cpu speed in GHz
        document.getElementById("cpu_MHz").innerHTML = cpu_speedInMHz + " MHz";
      });
    }, 1000);
  }
}

module.exports = { cpuSettings }