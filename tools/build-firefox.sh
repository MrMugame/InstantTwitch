#!/bin/sh

set -e

echo "** Building extension for firefox **"

echo "-> Setting up enviornment"
BLDIR=dist/
DES="$BLDIR"/firefox/
rm -rf $DES
mkdir -p $DES


echo "-> Building frontend"
export IT_OUTPUT_PATH=$DES
vite build -c vite.frontend.config.js --emptyOutDir
echo "-> Building backend"
export IT_OUTPUT_PATH=$DES/assets/
vite build -c vite.background.config.js


echo "-> Copying files"
cp platform/firefox/manifest.json $DES
cp -r platform/common/icons $DES

echo "-> FINISHED"
