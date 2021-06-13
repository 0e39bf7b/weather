#!/bin/bash

set -e

build_dir=weather

rm -rf $build_dir
mkdir $build_dir
cp -r configs/* $build_dir
mkdir -p $build_dir/usr/share/weather
cp -r backend $build_dir/usr/share/weather

cd frontend
npm install
npm run build
cd ..

cp -r frontend/build $build_dir/usr/share/weather/frontend
SIZE=`du -s $build_dir | cut -f1`
cp -r DEBIAN $build_dir
sed -i -e "s/Installed-Size: SIZE/Installed-Size: $SIZE/" $build_dir/DEBIAN/control
dpkg-deb --build $build_dir
