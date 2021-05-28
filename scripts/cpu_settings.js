var fs = require("fs");
const readline = require("readline");
const sys_info = require("systeminformation");
const { exec } = require("child_process");
module.exports = () => {
  
  // function to make exec function as first function to be executed
  function os_func() {
    this.execCommand = function (cmd, callback) {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        callback(stdout);
      });
    };
  }
  // Get CPU speed for the first time
  sys_info.cpuCurrentSpeed().then((cpu_speed) => {
    var cpu_speedInMHz = cpu_speed.avg * 1000;
    document.getElementById("cpu_MHz").innerHTML = cpu_speedInMHz + " MHz";
  });
  // CPU speed with interval
  setInterval(() => {
    sys_info.cpuCurrentSpeed().then((cpu_speed) => {
      var cpu_speedInMHz = cpu_speed.avg * 1000; //cpu_speed.avg = cpu speed in GHz
      document.getElementById("cpu_MHz").innerHTML = cpu_speedInMHz + " MHz";
    });
  }, 1000);

  var no_turbo = readline.createInterface({
    input: fs.createReadStream("/sys/devices/system/cpu/intel_pstate/no_turbo"),
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
        var os = new os_func();
        os.execCommand("echo 1 | pkexec tee /sys/devices/system/cpu/intel_pstate/no_turbo", function () {
          // show notification after command is executed
          new Notification("Boost Changer", {
            body: "Turbo Boost is now OFF",
          });
        });
      } else {
        var os = new os_func();
        os.execCommand("echo 0 | pkexec tee /sys/devices/system/cpu/intel_pstate/no_turbo", function () {
          // show notification after command is executed
          new Notification("Boost Changer", {
            body: "Turbo Boost is now ON",
          });
        });
      }
    });
  });

  var badgeTag = document.getElementById("bdg");
  var max_perf = readline.createInterface({
    input: fs.createReadStream(
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
    var os = new os_func();
    os.execCommand("echo 30 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", function () {
      // show notification after command is executed
      new Notification("Boost Changer", {
        body: "Mode: Power Save",
      });
    });
  });
  document.getElementById("btn-balance").addEventListener("click", () => {
    var os = new os_func();
    os.execCommand("echo 50 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", function () {
      // show notification after command is executed
      new Notification("Boost Changer", {
        body: "Mode: Balance",
      });
    });
  });
  document.getElementById("btn-perf").addEventListener("click", () => {
    var os = new os_func();
    os.execCommand("echo 70 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", function () {
      // show notification after command is executed
      new Notification("Boost Changer", {
        body: "Mode: Performance",
      });
    });
  });
  document.getElementById("btn-ultra").addEventListener("click", () => {
    var os = new os_func();
    os.execCommand("echo 100 | pkexec tee /sys/devices/system/cpu/intel_pstate/max_perf_pct", function () {
      // show notification after command is executed
      new Notification("Boost Changer", {
        body: "Mode: Ultra",
      });
    });
  });
};