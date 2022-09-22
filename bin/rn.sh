#!/bin/bash

xFILE=$1
echo 'File: '$xFILE
if [ "$xFILE" = "" ]; then
	xFILE=$(ls -1)
fi
xNUM=0
while read -r xLINE
do
	xLINE1=$(echo $xLINE | sed -e 's/\ /_/g')
	if [ "$xLINE" != "$xLINE1" ]; then
		mv "$xLINE" "$xLINE1"
		let xNUM=$xNUM+1
	fi
done <<< "$xFILE"
echo "Renamed "$xNUM" files."
ls -1
