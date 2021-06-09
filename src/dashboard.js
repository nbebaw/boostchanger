// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const sys_info = require("systeminformation");
module.exports = () => {
  //os name
  if (localStorage.getItem("os_name")) {
    document.getElementById("os_name").innerHTML =
      localStorage.getItem("os_name");
  } else {
    sys_info.osInfo().then((os_name) => {
      localStorage.setItem("os_name", os_name.distro);
      document.getElementById("os_name").innerHTML =
        localStorage.getItem("os_name");
    });
  }

  //Kernel name
  if (localStorage.getItem("kernel")) {
    document.getElementById("kernel").innerHTML =
      localStorage.getItem("kernel");
  } else {
    sys_info.osInfo().then((kernel) => {
      localStorage.setItem("kernel", kernel.kernel);
      document.getElementById("kernel").innerHTML =
        localStorage.getItem("kernel");
    });
  }

  // Up time
  if (localStorage.getItem("up_time")) {
    document.getElementById("up_time").innerHTML =
      localStorage.getItem("up_time");
  } else {
    var timeInSec = sys_info.time().uptime; // time will be in Sec
    var timeInHour = timeInSec / 3600; // change time from Sec to Hours
    var timeResult = timeInHour.toFixed(2) + " Hours";
    localStorage.setItem("up_time", timeResult);
    document.getElementById("up_time").innerHTML =
      localStorage.getItem("up_time");
  }

  // cpu name
  if (localStorage.getItem("cpu_name")) {
    document.getElementById("cpu_name").innerHTML =
      localStorage.getItem("cpu_name");
  } else {
    sys_info.cpu().then((cpu_name) => {
      var cpuname =
        cpu_name.manufacturer +
        " " +
        cpu_name.brand +
        " " +
        cpu_name.speed +
        "GHz";
      localStorage.setItem("cpu_name", cpuname);
      document.getElementById("cpu_name").innerHTML =
        localStorage.getItem("cpu_name");
    });
  }

  // Total memory
  if (localStorage.getItem("mem_total")) {
    document.getElementById("mem_total").innerHTML =
      localStorage.getItem("mem_total");
  } else {
    sys_info.mem().then((total_memory) => {
      var total_memoryInByte = total_memory.total;
      var total_memoryInGB = total_memoryInByte / Math.pow(1024, 3);
      var total = total_memoryInGB.toFixed(0) + " GB";
      localStorage.setItem("mem_total", total);
      document.getElementById("mem_total").innerHTML =
        localStorage.getItem("mem_total");
    });
  }

  // Local IP
  if (localStorage.getItem("local_ip")) {
    document.getElementById("local_ip").innerHTML =
      localStorage.getItem("local_ip");
  } else {
    sys_info.networkInterfaces().then((data) => {
      localStorage.setItem("local_ip", data[1].ip4);
      document.getElementById("local_ip").innerHTML =
        localStorage.getItem("local_ip");
    });
  }

  // Public IP
  if (localStorage.getItem("public_ip")) {
    document.getElementById("public_ip").innerHTML =
      localStorage.getItem("public_ip");
  } else {
    const publicIp = require("public-ip");
    publicIp.v4().then((ip_public) => {
      localStorage.setItem("public_ip", ip_public);
      document.getElementById("public_ip").innerHTML =
        localStorage.getItem("public_ip");
    });
  }
  
  //Gateway default
  if (localStorage.getItem("gateway_default")) {
    document.getElementById("gateway_default").innerHTML =
      localStorage.getItem("gateway_default");
  } else {
    sys_info.networkGatewayDefault().then((gateway_default) => {
      localStorage.setItem("gateway_default", gateway_default);
      document.getElementById("gateway_default").innerHTML =
        localStorage.getItem("gateway_default");
    });
  }
};
