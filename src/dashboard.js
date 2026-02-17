// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
class dashboard {
  constructor() {
    this.elements = {
      os_name: document.getElementById("os_name"),
      kernel: document.getElementById("kernel"),
      up_time: document.getElementById("up_time"),
      cpu_name: document.getElementById("cpu_name"),
      mem_total: document.getElementById("mem_total"),
      disk_type: document.getElementById("disk_type"),
      disk_size: document.getElementById("disk_size"),
      disk_vendor: document.getElementById("disk_vendor"),
      has_battery: document.getElementById("has_battery")
    };
    
    this.sys_info = require("systeminformation");
    this.getAllValues();
  }

  /**
   * Set element content with localStorage caching
   * @param {HTMLElement} element HTML element to update
   * @param {String} key localStorage key
   * @param {String} value Value to store and display
   */
  setElementWithCache(element, key, value) {
    if (!element) return;
    
    // Use cached value if available, otherwise set new value
    const cachedValue = localStorage.getItem(key);
    if (cachedValue) {
      element.innerHTML = cachedValue;
    } else {
      localStorage.setItem(key, value);
      element.innerHTML = value;
    }
  }

  /**
   * Format bytes to GB
   * @param {Number} bytes Bytes value
   * @returns {String} Formatted GB string
   */
  formatGB(bytes) {
    return (bytes / Math.pow(1000, 3)).toFixed(0) + " GB";
  }

  /**
   * Format uptime to hours
   * @param {Number} seconds Uptime in seconds
   * @returns {String} Formatted hours string
   */
  formatUptime(seconds) {
    return (seconds / 3600).toFixed(2) + " Hours";
  }

  /**
   * Fetch and display all system information
   */
  getAllValues() {
    const valueObject = {
      cpu: 'manufacturer, brand, speed',
      osInfo: 'distro, kernel',
      time: 'uptime',
      mem: 'total',
      diskLayout: '*',
      battery: '*'
    };

    this.sys_info.get(valueObject).then(data => {
      // OS and kernel info
      this.setElementWithCache(this.elements.os_name, "os_name", data.osInfo.distro);
      this.setElementWithCache(this.elements.kernel, "kernel", data.osInfo.kernel);
      
      // Uptime
      this.setElementWithCache(this.elements.up_time, "up_time", this.formatUptime(data.time.uptime));
      
      // CPU info
      const cpuInfo = `${data.cpu.manufacturer} ${data.cpu.brand} ${data.cpu.speed} GHz`;
      this.setElementWithCache(this.elements.cpu_name, "cpu_name", cpuInfo);
      
      // Memory
      this.setElementWithCache(this.elements.mem_total, "mem_total", this.formatGB(data.mem.total));
      
      // Disk information
      const diskTypes = [];
      const diskVendors = [];
      const diskSizes = [];
      
      data.diskLayout.forEach(disk => {
        diskTypes.push(disk.type);
        diskVendors.push(disk.vendor);
        diskSizes.push(this.formatGB(disk.size));
      });
      
      this.setElementWithCache(this.elements.disk_type, "disk_type", diskTypes.join(", "));
      this.setElementWithCache(this.elements.disk_size, "disk_size", diskSizes.join(", "));
      this.setElementWithCache(this.elements.disk_vendor, "disk_vendor", diskVendors.join(", "));
      
      // Battery status
      this.setElementWithCache(this.elements.has_battery, "has_battery", data.battery.hasBattery);
    }).catch(error => {
      console.error("Error fetching system information:", error);
    });
  }
}

module.exports = { dashboard };
