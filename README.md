# Boost Changer

## Boost Changer is now for AMD and Intel Processors :bangbang:

![GitHub](https://img.shields.io/github/license/nbebaw/boostchanger) ![GitHub all releases](https://img.shields.io/github/downloads/nbebaw/boostchanger/total) ![GitHub repo size](https://img.shields.io/github/repo-size/nbebaw/boostchanger) ![GitHub issues](https://img.shields.io/github/issues/nbebaw/boostchanger) ![GitHub closed issues](https://img.shields.io/github/issues-closed/nbebaw/boostchanger) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/nbebaw/boostchanger) ![GitHub last commit](https://img.shields.io/github/last-commit/nbebaw/boostchanger)

## :bangbang: This App is now only for Linux :bangbang:

### :heavy_exclamation_mark: This App needs root rights. When and why? :heavy_exclamation_mark:

Boost Changer is made to control the frequencies of the CPUs. It can also manage the processor's energy consumption through Energy-Performance Preference.

In generall this app does not need root rights but when you hit the Turn Off or On button a popup window will ask you about your root password.

#### why?

- If you have Intel then in your Kernel there is a file called <code>/sys/devices/system/cpu/intel_pstate/no_turbo</code>.
> To turn off or on your turbo boost you have to change this file and that is what this app does.<br>

- If you have Intel then In your Kernel there is a file called <code>/sys/devices/system/cpu/intel_pstate/max_perf_pct</code>.
> when you change the energy performance in Boost Changer you have to change this file and that is what this app does.

#### :pushpin: This app will only work on a real machine. :pushpin:

## What it isn't
This is just a GUI application and it is not meant to replace 
[TLP](https://linrunner.de/en/tlp/tlp.html), [powertop](https://01.org/powertop) or 
any other power management / energy consumption service. It is meant just to 
provide quick access to ``sysfs`` settings related to Intel Processors and 
in fact it can run on top of TLP.

## Installation
### Download
  
  OS| Release Link |
--- | --- |
Debian | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v5.0.1/boostchanger-5.0.1.AppImage) :cd: | 
Ubuntu | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v5.0.1/boostchanger-5.0.1.AppImage) :cd: | 
Fedora | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v5.0.1/boostchanger-5.0.1.AppImage) :cd: | 
Redhat | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v5.0.1/boostchanger-5.0.1.AppImage) :cd: | 
Solus | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v5.0.1/boostchanger-5.0.1.AppImage) :cd: | 
OpenSUSE | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v5.0.1/boostchanger-5.0.1.AppImage) :cd: | 
Arch | [AUR](https://aur.archlinux.org/packages/boostchanger-git) :cd: | 

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/boostchanger)
### How to run AppImage
```bash
# Download the app
wget https://github.com/nbebaw/boostchanger/releases/download/v5.0.1/boostchanger-5.0.1.AppImage

# Make the app executable 
chmod +x boostchanger-5.0.1.AppImage

# Run the app
./boostchanger-5.0.1.AppImage
```
## Installation only for Developer
You can help me to improve this app

```bash
# Clone this repo
git clone https://github.com/nbebaw/boostchanger.git

# Install dependencies
npm install

# Run the App
npm run
```

## Common Issue for AppImage
<pre>The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing ...</pre>
:white_check_mark: [The solution](https://github.com/nbebaw/boostchanger/issues/1)

## New features for future releases
1 = High Prio |  2 = Middle Prio |  3 = Low Prio
Feature | Prio
--- | ---
GPU Frequencies | 1
[Nvidia PowerMizer Settings](https://www.nvidia.com/en-us/drivers/feature-powermizer/) | 2
Represent all Infos about the Machine | 2
Make this App cross Platform | 3


<br>

![Dashboard](https://user-images.githubusercontent.com/57049550/180617370-22a0519d-49c4-42a3-b203-b42af43a8c8b.png)

![settings](https://user-images.githubusercontent.com/57049550/180617369-ad475dcc-cddf-48e9-ae55-ee189ad0afae.png)

![About](https://user-images.githubusercontent.com/57049550/180617368-b06177db-0fd5-474d-b5e0-c816adbf7aa5.png)