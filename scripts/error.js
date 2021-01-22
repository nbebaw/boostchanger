const { exec } = require("child_process");

exec("cat /proc/cpuinfo | grep -m1 'vendor_id' | awk '{ print $3 }'", (stderr, stdout) => {
    if (stderr instanceof Error) { throw stderr; }
    if (stdout.includes("AuthenticAMD")) {
        document.getElementById("error").innerHTML = "you have AMD cpu. <br> This App works only now with Intel CPUs";
    } else {
        exec("systemd-detect-virt", (stderr, stdout) => {
            if (stderr instanceof Error) { throw stderr; }
            if (stdout.includes("none")) {
                document.getElementById("error").innerHTML = "you have an old Intel CPU. <br> This App works only now on a modern Intel CPUs";
            } else {
                document.getElementById("error").innerHTML = "you are using a VM. <br> This App works only on a real Machine."
            }
        })
    }
})




