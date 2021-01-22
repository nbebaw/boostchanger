#!/bin/bash

pkgver=4.0.3

if [[ -f /usr/bin/boostchanger ]]
then
    rm /usr/bin/boostchanger
    rm /usr/share/applications/boostchanger.desktop
    rm /usr/share/pixmaps/boostchanger.png
    echo "The old version of Boost Changer has been removed"
    cd app/
    install -Dm755 boostchanger-$pkgver.AppImage /usr/bin/boostchanger
    install -Dm644 boostchanger.desktop /usr/share/applications/boostchanger.desktop
    install -Dm644 boostchanger.png /usr/share/pixmaps/boostchanger.png
    echo "Boost Changer is successfully installed"
else
    cd app/
    install -Dm755 boostchanger-$pkgver.AppImage /usr/bin/boostchanger
    install -Dm644 boostchanger.desktop /usr/share/applications/boostchanger.desktop
    install -Dm644 boostchanger.png /usr/share/pixmaps/boostchanger.png
    echo "Boost Changer is successfully installed"
fi 

