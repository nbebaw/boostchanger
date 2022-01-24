// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
class dashboard {
  constructor() {
    this.os_name_value = document.getElementById("os_name")
    this.kernel_name_value = document.getElementById("kernel")
    this.up_time_value = document.getElementById("up_time")
    this.cpu_name_value = document.getElementById("cpu_name")
    this.mem_total_value = document.getElementById("mem_total")
    this.sys_info = require("systeminformation")

    // OS_NAME
    this.getOsName()
    // KERNEL
    this.getKernel()
    // UP TIME
    this.getUpTime()
    // CPU NAME
    this.getCpuName()
    // TOTAL MEMORY
    this.getTotalMemory()
  }
  // LocalStorage setItem
  setValueItem(key_name, value_name) {
    localStorage.setItem(key_name, value_name)
  }

  getOsName() {
    if (localStorage.getItem("os_name")) {
      this.os_name_value.innerHTML = localStorage.getItem("os_name");
    } else {
      this.sys_info.osInfo().then((os_name) => {
        this.setValueItem("os_name", os_name.distro)
        this.os_name_value.innerHTML = localStorage.getItem("os_name");
      });
    }
  }

  getKernel() {
    if (localStorage.getItem("kernel")) {
      this.kernel_name_value.innerHTML = localStorage.getItem("kernel");
    } else {
      this.sys_info.osInfo().then((kernel) => {
        this.setValueItem("kernel", kernel.kernel)
        this.kernel_name_value.innerHTML = localStorage.getItem("kernel");
      });
    }
  }

  getUpTime() {
    if (localStorage.getItem("up_time")) {
      this.up_time_value.innerHTML = localStorage.getItem("up_time");
    } else {
      var timeInSec = this.sys_info.time().uptime; // time will be in Sec
      var timeInHour = timeInSec / 3600; // change time from Sec to Hours
      var timeResult = timeInHour.toFixed(2) + " Hours";
      this.setValueItem("up_time", timeResult)
      this.up_time_value.innerHTML = localStorage.getItem("up_time");
    }
  }

  getCpuName() {
    if (localStorage.getItem("cpu_name")) {
      this.cpu_name_value.innerHTML = localStorage.getItem("cpu_name");
    } else {
      this.sys_info.cpu().then((cpu_name) => {
        var cpuname =
          cpu_name.manufacturer +
          " " +
          cpu_name.brand +
          " " +
          cpu_name.speed +
          "GHz";
        this.setValueItem("cpu_name", cpuname)
        this.cpu_name_value.innerHTML = localStorage.getItem("cpu_name");
      });
    }
  }

  getTotalMemory() {
    if (localStorage.getItem("mem_total")) {
      this.mem_total_value.innerHTML = localStorage.getItem("mem_total");
    } else {
      this.sys_info.mem().then((total_memory) => {
        var total_memoryInByte = total_memory.total;
        var total_memoryInGB = total_memoryInByte / Math.pow(1024, 3);
        var total = total_memoryInGB.toFixed(0) + " GB";
        this.setValueItem("mem_total", total)
        this.mem_total_value.innerHTML = localStorage.getItem("mem_total");
      });
    }
  }
}
module.exports = { dashboard }