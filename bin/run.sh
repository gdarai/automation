#!/bin/bash

xFILE=$1
xPLUS=$2
xEDITOR="/usr/bin/gedit "
echo "Louncher programmed by G. Darai"
if [ "$xFILE" = "" ]
then
	echo "run [file]"
	echo "run [program] [file]"
	echo "run -help"
	return
fi
if [ "$xFILE" = "-help" ]
then
	echo "	run [file]		Find the correct program and run."
	echo "	run [program] [file]	Run the file with selected program."
	echo "	run -help		This help."
	echo "	run -list		List known programs."
	echo "	run -setext		Edit file with predefined extensions."
	echo "	run -setprg		Edit file with predefined programs."
	return
fi
if [ "$xFILE" = "-list" ]
then
	echo "##	File type	Program"
	while read -r xLINE
	do
		xLINE1=($xLINE)
		echo ${xLINE1[0]}"	"${xLINE1[1]}"		"${xLINE1[2]}
	done < $HOME/.local/bin/run-programs.txt
	return
fi
if [ "$xFILE" = "-setext" ]
then
	xFILE=$HOME"/.local/bin/run-extensions.txt"
	$xEDITOR$xFILE
	return
fi
if [ "$xFILE" = "-setprg" ]
then
	xFILE=$HOME"/.local/bin/run-programs.txt"
	$xEDITOR$xFILE
	return
fi
xPRG=""
if [ "$xPLUS" != "" ]
then
	xPRG=$xFILE
	xFILE=$xPLUS
fi

echo 'File: '$xFILE
if [[ $xFILE == */* ]]
then
	echo "Cutting off path"
	xFILE=$(echo $xFILE | sed -e 's/.*\/\(.*\)$/\1/')
	echo 'File: '$xFILE
fi

xPATH=$(pwd)
echo 'Path: '$xPATH

if [ "$xPRG" == "" ]
then
	xEXT=$(echo $xFILE | sed -e 's/.*\.\(.*\)$/\1/')
	echo 'Ext:  '$xEXT

	xCMD="0"

	while read -r xLINE
	do
		xLINE1=($xLINE)
		if [[ $xEXT == ${xLINE1[0]} ]]
		then
			xPRG=${xLINE1[1]}
		fi
	done < $HOME/.local/bin/run-extensions.txt
	if [ "$xPRG" = "" ]
	then
		echo "Unknown file extension, use run -help and define this extension."
		echo "	or select the target program manually: run [program] [file]"
		return
	fi
fi

echo "Tool:"$xPRG":"

while read -r xLINE
do
	xLINE1=($xLINE)
	if [[ $xPRG == ${xLINE1[0]} ]]
	then
		echo "Identified as "${xLINE1[1]}" file."
		xCMD=${xLINE1[2]}
		if [ "${xLINE1[3]}" = "space" ]
		then
			xCMD=$xCMD" "
		fi
		if [ "${xLINE1[3]}" = "file" ]
		then
			xCMD=$xCMD" file:///"
		fi
 	fi	
done < $HOME/.local/bin/run-programs.txt

if [ "$xCMD" != "0" ]
then
	xCMD=$xCMD$xPATH"/"$xFILE
	echo "Running command "$xCMD
	$xCMD
	return
fi
echo "Selected tool "$xPRG" is not defined, use run -help and define it."
