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
    // this.getOsName()
    // KERNEL
    // this.getKernel()
    // // UP TIME
    // this.getUpTime()
    // // CPU NAME
    // this.getCpuName()
    // // TOTAL MEMORY
    // this.getTotalMemory()
    // // DISK TYPE
    // this.getDiskType()
    // // DISK MODEL
    // this.getDiskModel()
    // // DISK VENDOR
    // this.getDiskVendor()
    // // HAS BATTERY
    // this.getBatteryInfo()

    this.getAllValues()
  }

  getSetItems(html_element, target, data) {
    if (localStorage.getItem(target)) {
      html_element.innerHTML = localStorage.getItem(target);
    } else {
      localStorage.setItem(target, data)
      html_element.innerHTML = localStorage.getItem(target);
    }
  }

  getAllValues() {
    // define all values, you want to get back
    var valueObject = {
      cpu: 'manufacturer, brand, speed',
      osInfo: 'distro, kernel',
      time: 'uptime',
      mem: 'total',
      diskLayout: '*',
      battery: '*'
    }

    this.sys_info.get(valueObject).then(data => {
      // OS NAME
      this.getSetItems(this.os_name_value, "os_name", data.osInfo.distro)
      // KERNEL VERSION
      this.getSetItems(this.kernel_name_value, "kernel", data.osInfo.kernel)
      // UP TIME
      this.getSetItems(this.up_time_value, "up_time", (data.time.uptime / 3600).toFixed(2) + " Hours")
      // CPU NAME
      this.getSetItems(this.cpu_name_value, "cpu_name", data.cpu.manufacturer + " " + data.cpu.brand + " " + data.cpu.speed + " GHz")
      // TOTAL MEMORY
      this.getSetItems(this.mem_total_value, "mem_total", (data.mem.total / Math.pow(1000, 3)).toFixed(0) + " GB")

      var diskType = [];
      var diskModel = [];
      var diskVendor = [];
      data.diskLayout.forEach(element => {
        diskType.push(element.type)
        diskModel.push(element.name)
        diskVendor.push(element.vendor)
      });
      this.getSetItems(this.disk_type_value, "disk_type", diskType.join(", "))
      this.getSetItems(this.disk_model_value, "disk_model", diskModel.join(", "))
      this.getSetItems(this.disk_vendor_value, "disk_vendor", diskVendor.join(", "))
      this.getSetItems(this.has_battery_value, "has_battery", data.battery.hasBattery)
    });
  }
}
module.exports = { dashboard }