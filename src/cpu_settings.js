class cpuSettings {
  constructor() {
    this.fs = require("fs")
    this.readline = require("readline")
    this.sys_info = require("systeminformation")
    this.exec = require("child_process").exec
    this.boostchanger = require("./lib/boostchanger").lib
    this.intelOrAMD()
    this.getCpuSpeed()
  }

  // exec function
  os_func(cmd, callback) {
    this.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      callback(stdout)
    })
  }

  intelOrAMD() {
    this.os_func("cat /proc/cpuinfo | grep -m1 'vendor_id' | awk '{ print $3 }'", (vendor) => {
      // show notification after command is executed
      var vendor_name = vendor.trim();
      if (vendor_name == "GenuineIntel") {
        this.boostchanger.turboBoost_Intel("/sys/devices/system/cpu/intel_pstate/no_turbo");
        this.perf_settings(true);
      } else {
        this.boostchanger.turboBoost_AMD("/sys/devices/system/cpu/cpufreq/boost");
        document.getElementById("cpu-perf-container").style.display = none;
      }
    })
  }

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

  perf_settings(intelOrAMD) {
    if (intelOrAMD) {
      var badgeTag = document.getElementById("bdg");
      var max_perf = this.readline.createInterface({
        input: this.fs.createReadStream(
          "/sys/devices/system/cpu/intel_pstate/max_perf_pct"
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
        this.os_func("echo 30 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", () => {
          // show notification after command is executed
          new Notification("Boost Changer", {
            body: "Mode: Power Save",
          });
          badgeTag.innerHTML = "Power Save"
        })
      });
      document.getElementById("btn-balance").addEventListener("click", () => {
        this.os_func("echo 50 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", () => {
          // show notification after command is executed
          new Notification("Boost Changer", {
            body: "Mode: Balance",
          });
          badgeTag.innerHTML = "Balance"
        })
      });
      document.getElementById("btn-perf").addEventListener("click", () => {
        this.os_func("echo 70 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", () => {
          // show notification after command is executed
          new Notification("Boost Changer", {
            body: "Mode: Performance",
          });
          badgeTag.innerHTML = "Performance"
        })
      });
      document.getElementById("btn-ultra").addEventListener("click", () => {
        this.os_func("echo 100 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", () => {
          // show notification after command is executed
          new Notification("Boost Changer", {
            body: "Mode: Ultra",
          });
          badgeTag.innerHTML = "Ultra"
        })
      });
    } else {
      // TODO
    }
  }
}

module.exports = { cpuSettings }