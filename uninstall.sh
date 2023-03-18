#!/bin/bash

pkgver=5.0.2

if [[ -f /usr/bin/boostchanger ]]
then
    rm /usr/bin/boostchanger
    rm /usr/share/applications/boostchanger.desktop
    rm /usr/share/pixmaps/boostchanger.png
    echo "Boost Changer is successfully uninstalled"
fi 