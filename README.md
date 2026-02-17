# Boost Changer

<p align="center">
  <strong>Control CPU Turbo Boost and Energy Performance on Linux</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/nbebaw/boostchanger" alt="License">
  <img src="https://img.shields.io/github/downloads/nbebaw/boostchanger/total" alt="Downloads">
  <img src="https://img.shields.io/github/v/release/nbebaw/boostchanger" alt="Release">
  <img src="https://img.shields.io/github/issues/nbebaw/boostchanger" alt="Issues">
  <img src="https://img.shields.io/github/last-commit/nbebaw/boostchanger" alt="Last Commit">
</p>

---

## Overview

Boost Changer is a lightweight Electron-based desktop application that provides an intuitive GUI for managing CPU turbo boost settings and energy performance preferences on Linux systems. It supports both **Intel** and **AMD** processors, allowing you to optimize your system for performance or battery life with a single click.

### Key Features

- **Turbo Boost Control**: Toggle CPU turbo boost on/off instantly
- **Energy Performance Modes**: Choose between Power Save, Balance, Performance, and Ultra modes
- **System Dashboard**: View detailed system information (OS, CPU, memory, disk, battery)
- **Real-time Monitoring**: Live CPU frequency monitoring
- **Intel & AMD Support**: Works with both Intel P-State and AMD CPUFreq drivers
- **Lightweight**: Minimal resource footprint with modern UI
- **Auto-Updates**: Built-in update mechanism for non-Arch Linux distributions

### Supported Processors

- **Intel**: Modern processors with Intel P-State driver (Sandy Bridge and newer)
- **AMD**: Processors with CPUFreq driver support

---

## Why Root Privileges?

Boost Changer requires root privileges only when modifying CPU settings. The app uses `pkexec` to securely elevate privileges for specific operations:

### What It Modifies

#### Intel Processors
- `/sys/devices/system/cpu/intel_pstate/no_turbo` - Turbo boost on/off
- `/sys/devices/system/cpu/intel_pstate/max_perf_pct` - Performance percentage (30%, 50%, 70%, 100%)

#### AMD Processors
- `/sys/devices/system/cpu/cpufreq/boost` - Turbo boost on/off
- `/sys/devices/system/cpu/cpu*/cpufreq/scaling_governor` - Governor settings (conservative, powersave, performance, schedutil)

A system authentication dialog will appear when you change settings. The app itself runs as a regular user and only elevates privileges for specific file writes.

### Important Notes

- **Physical Hardware Only**: This app will not work in virtual machines (VM detection is built-in)
- **Not a Replacement**: Boost Changer is not meant to replace power management tools like [TLP](https://linrunner.de/en/tlp/tlp.html) or [powertop](https://01.org/powertop). It provides quick GUI access to sysfs settings and can run alongside these tools.

---

## Installation

### Quick Install

| Distribution | Installation Method |
|--------------|---------------------|
| **Arch Linux** | [AUR Package](https://aur.archlinux.org/packages/boostchanger-git) `yay -S boostchanger-git` |
| **Snap Store** | [![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/boostchanger) |
| **Universal** | [AppImage](https://github.com/nbebaw/boostchanger/releases/latest) (works on all distros) |

### AppImage Installation

```bash
# Download the latest release
wget https://github.com/nbebaw/boostchanger/releases/latest/download/boostchanger-5.1.0.AppImage

# Make it executable
chmod +x boostchanger-5.1.0.AppImage

# Run the application
./boostchanger-5.1.0.AppImage
```

### Distribution-Specific Packages

Download from [Releases](https://github.com/nbebaw/boostchanger/releases/latest):
- **Debian/Ubuntu**: `.deb` package
- **Fedora/RHEL**: Use AppImage
- **openSUSE**: Use AppImage
- **Arch Linux**: AUR package (recommended)

---

## Development

Want to contribute? Here's how to set up the development environment:

```bash
# Clone the repository
git clone https://github.com/nbebaw/boostchanger.git
cd boostchanger

# Install dependencies
npm install

# Run in development mode
npm start

# Build for Linux
npm run build

# Check for outdated dependencies
npm run check

# Update all dependencies
npm run updateAll
```

### Project Structure

```
boostchanger/
├── src/
│   ├── main.js           # Electron main process
│   ├── preload.js        # Preload script
│   ├── constants.js      # Configuration constants
│   ├── dashboard.js      # System info dashboard
│   ├── cpu_settings.js   # CPU settings page
│   ├── error.js          # Error handling
│   ├── updater.js        # Auto-update mechanism
│   ├── mainMenu.js       # Application menu
│   └── lib/
│       └── boostchanger.js  # Core CPU control library
├── public/
│   ├── index.html        # Dashboard HTML
│   ├── cpu_settings.html # Settings HTML
│   └── CSS/
│       └── style.css     # Styles
└── build/                # Build resources
```

### Technology Stack

- **Electron**: v40.4.1
- **Node.js**: CommonJS modules
- **UI**: Vanilla JavaScript, CSS Grid/Flexbox
- **System Info**: systeminformation package
- **Updates**: electron-updater

---

## Troubleshooting

### Common Issues

#### AppImage SUID Sandbox Error

```
The SUID sandbox helper binary was found, but is not configured correctly...
```

**Solution**: Run with `--no-sandbox` flag or see [Issue #1](https://github.com/nbebaw/boostchanger/issues/1) for permanent fix.

```bash
./boostchanger-5.1.0.AppImage --no-sandbox
```

#### App Shows "VM Detected" Error

This app requires physical hardware access to CPU control files. It will not work in virtual machines (VirtualBox, VMware, QEMU, etc.).

#### Old Intel CPU Not Supported

If you have an Intel CPU older than Sandy Bridge (2011), it may not support Intel P-State driver. Check if the following file exists:

```bash
ls /sys/devices/system/cpu/intel_pstate/no_turbo
```

If not present, your CPU may be too old or using the legacy ACPI driver.

---

## Roadmap

| Feature | Priority | Status |
|---------|----------|--------|
| GPU Frequency Control | High | Planned |
| NVIDIA PowerMizer Settings | Medium | Planned |
| Extended System Monitoring | Medium | Planned |
| Wayland Support Improvements | Medium | In Progress |
| Cross-Platform Support (Windows/macOS) | Low | Under Consideration |

---

## Screenshots

### Dashboard
![Dashboard](https://user-images.githubusercontent.com/57049550/180617370-22a0519d-49c4-42a3-b203-b42af43a8c8b.png)

### CPU Settings
![Settings](https://user-images.githubusercontent.com/57049550/180617369-ad475dcc-cddf-48e9-ae55-ee189ad0afae.png)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Test your changes on real hardware (not VM)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/nbebaw/boostchanger/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nbebaw/boostchanger/discussions)

---

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- System information provided by [systeminformation](https://systeminformation.io/)
- Icons and UI inspired by modern Linux desktop environments

---

<p align="center">Made with ❤️ for the Linux community</p>
