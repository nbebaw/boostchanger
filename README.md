# Boost Changer
### Here you can find the old repo of this app in gitlab
https://gitlab.com/nbebaw/boostchanger

<br>

<h2>&#9889; This App is only for Linux &#9889;</h2>
<h2>&#10071; This App needs root rights. When and why? &#10071;</h2>
<p>Boost Changer is made to control the frequencies of Intel CPUs. It can also manage the processor's energy consumption through Energy-Performance Preference.</p>
<p>In generall this app does not need root rights but when you hit the Turn Off or On button a popup window will ask you about your root password.<br>
<u>why?</u> 

- In your Kernel there is a file called <code>/sys/devices/system/cpu/intel_pstate/no_turbo</code>.
> To turn off or on your turbo boost you have to change this file and that is what this app does.<br>

- In your Kernel there is a file called <code>/sys/devices/system/cpu/intel_pstate/max_perf_pct</code>.
> when you change the energy performance in Boost Changer you have to change this file and that is what this app does.

<u>This app will only work on a real machine.</u>
<h3><u>For Developer</u><h3>
You can help me to improve this app
<h4>Clone this repository</h4>
git clone https://github.com/nbebaw/boostchanger.git
<h4>Go into the repository</h4>
cd boostChanger
<h4>Install dependencies</h4>
npm install
<h4>Run the app</h4>
npm start
<br>
<h3><u>For all Debian, Ubuntu, Mint, Fedora, Solus, OpenSUSE, Deepin users </u></h3>
<h4>&#9203; How to run this app &#9203;</h4>
<h4>Download AppImage</h4>
<h5>Install wget if you don't have ( Ignore this step if you already have wget )</h5>
<pre>sudo apt install wget</pre> 
<pre>wget https://github.com/nbebaw/boostchanger/releases/download/v4.0.3/boostchanger-4.0.3.AppImage</pre>
<h4>Make the app executable app</h4>
<pre>chmod +x boostchanger-4.0.3.AppImage</pre>
<h4>Run the app</h4>
<pre>./boostchanger-4.0.3.AppImage</pre>
  Or just double click the app and it will run 
<h3><u>For Arch Linux users</u></h3>
<p>This app is already in AUR</p>
https://aur.archlinux.org/packages/boostchanger-git/

<br>

![Dashboard](https://user-images.githubusercontent.com/57049550/105500022-9483ab80-5cc2-11eb-88e1-260d326c0ba0.png)

![settings](https://user-images.githubusercontent.com/57049550/105500026-95b4d880-5cc2-11eb-96f9-0ab83e7ed054.png)

![About](https://user-images.githubusercontent.com/57049550/105500025-95b4d880-5cc2-11eb-9940-7f97a9344080.png)
