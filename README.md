# Boost Changer
### Here you can find the old repo of this app in gitlab
https://gitlab.com/nbebaw/boostchanger

## :bangbang: This App is now only for Linux :bangbang:

### :heavy_exclamation_mark: This App needs root rights. When and why? :heavy_exclamation_mark:

Boost Changer is made to control the frequencies of Intel CPUs. It can also manage the processor's energy consumption through Energy-Performance Preference.

In generall this app does not need root rights but when you hit the Turn Off or On button a popup window will ask you about your root password.

#### why?

- In your Kernel there is a file called <code>/sys/devices/system/cpu/intel_pstate/no_turbo</code>.
> To turn off or on your turbo boost you have to change this file and that is what this app does.<br>

- In your Kernel there is a file called <code>/sys/devices/system/cpu/intel_pstate/max_perf_pct</code>.
> when you change the energy performance in Boost Changer you have to change this file and that is what this app does.

#### :pushpin: This app will only work on a real machine. :pushpin:

## Installation
### Download
  
  OS| Release Link |
--- | --- |
Debian | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v4.0.3/boostchanger-4.0.3.AppImage) :cd: | 
Ubuntu | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v4.0.3/boostchanger-4.0.3.AppImage) :cd: | 
Fedora | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v4.0.3/boostchanger-4.0.3.AppImage) :cd: | 
Redhat | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v4.0.3/boostchanger-4.0.3.AppImage) :cd: | 
Solus | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v4.0.3/boostchanger-4.0.3.AppImage) :cd: | 
OpenSUSE | [AppImage](https://github.com/nbebaw/boostchanger/releases/download/v4.0.3/boostchanger-4.0.3.AppImage) :cd: | 
Arch | [AUR](https://aur.archlinux.org/packages/boostchanger-git) :cd: | 

### How to run AppImage
```bash
# Make the app executable 
chmod +x boostchanger-4.0.3.AppImage

# Run the app
./boostchanger-4.0.3.AppImage
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

<br>

![Dashboard](https://user-images.githubusercontent.com/57049550/105500022-9483ab80-5cc2-11eb-88e1-260d326c0ba0.png)

![settings](https://user-images.githubusercontent.com/57049550/105500026-95b4d880-5cc2-11eb-96f9-0ab83e7ed054.png)

![About](https://user-images.githubusercontent.com/57049550/105500025-95b4d880-5cc2-11eb-9940-7f97a9344080.png)
