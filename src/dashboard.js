// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
class dashboard {
  constructor() {
    this.os_name_value = document.getElementById("os_name")
    this.kernel_name_value = document.getElementById("kernel")
    this.up_time_value = document.getElementById("up_time")
    this.cpu_name_value = document.getElementById("cpu_name")
    this.mem_total_value = document.getElementById("mem_total")
    this.disk_type_value = document.getElementById("disk_type")
    this.disk_model_value = document.getElementById("disk_model")
    this.disk_vendor_value = document.getElementById("disk_vendor")
    this.has_battery_value = document.getElementById("has_battery")
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
    this.getDiskType()
    this.getDiskModel()
    this.getDiskVendor()
    this.getBatteryInfo()
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
  // Disk Type
  getDiskType() {
    if (localStorage.getItem("disk_type")) {
      this.disk_type_value.innerHTML = localStorage.getItem("disk_type")
    } else {
      this.sys_info.diskLayout().then((disk_type) => {
        this.setValueItem("disk_type", disk_type[0].type)
        this.disk_type_value.innerHTML = localStorage.getItem("disk_type")
      })
    }
  }
  // Disk Model
  getDiskModel() {
    if (localStorage.getItem("disk_model")) {
      this.disk_model_value.innerHTML = localStorage.getItem("disk_model")
    } else {
      this.sys_info.diskLayout().then((disk_model) => {
        this.setValueItem("disk_model", disk_model[0].name)
        this.disk_model_value.innerHTML = localStorage.getItem("disk_model")
      })
    }
  }
  // Disk Vendor
  getDiskVendor() {
    if (localStorage.getItem("disk_vendor")) {
      this.disk_vendor_value.innerHTML = localStorage.getItem("disk_vendor")
    } else {
      this.sys_info.diskLayout().then((disk_vendor) => {
        this.setValueItem("disk_vendor", disk_vendor[0].vendor)
        this.disk_vendor_value.innerHTML = localStorage.getItem("disk_vendor")
      })
    }
  }
  // Has Battery
  getBatteryInfo() {
    if (localStorage.getItem("has_battery")) {
      this.has_battery_value.innerHTML = localStorage.getItem("has_battery")
    } else {
      this.sys_info.battery().then((has_battery) => {
        this.setValueItem("has_battery", has_battery.hasBattery)
        this.has_battery_value.innerHTML = localStorage.getItem("has_battery")
      })
    }
  }
}
module.exports = { dashboard }