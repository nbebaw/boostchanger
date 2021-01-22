# Boost Changer

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
git clone https://gitlab.com/nbebaw/boostchanger.git
<h4>Go into the repository</h4>
cd boostChanger
<h4>Install dependencies</h4>
npm install
<h4>Run the app</h4>
npm start
<br>
<h3><u>For all Debian, Ubuntu, Mint, Fedora, Solus, OpenSUSE, Deepin users </u></h3>
<h4>&#9203; How to run this app &#9203;</h4>
<h4>Download</h4>
If you don't have wget<br>
<code>sudo apt install wget</code> ( Ignore this step if you already have wget ) <br>
<code>wget https://gitlab.com/nbebaw/boostchanger/-/archive/v3.9/boostchanger-v3.9.zip</code><br>
<h4>Install</h4>
<p>unzip the file</p>
<code>unzip boostchanger-v3.9.zip</code>
<h4>Run setup file</h4>
<code>cd boostchanger-v3.9
<code>sudo ./setup.sh</code>
<h3><u>For Arch Linux users</u></h3>
<p>This app is already in AUR</p>
https://aur.archlinux.org/packages/boostchanger-git/

<br>

![Dashboard](/uploads/f6ad43a12647f17ad2f34c500ba76ee9/Dashboard.png)

![ProcessorSettings](/uploads/925a7ce3857fd9dd729b9f554c50a20b/ProcessorSettings.png)

![about](/uploads/2c3f6285044e626f7c0cec5447228a73/about.png)
