#!/bin/bash

xFILE=$1
xPLUS1=$2
xPLUS2=$3
xEDITOR="/usr/bin/gedit "
xFILENAME="default"
echo "Morning wellcome by G. Darai"
echo "For basic help type: martin -help"
echo ""

if [ "$xFILE" = "-help" ]
then
	echo "   - All commands requiring [file] can be called without it in that case it will use the default file."
	echo "	martin -help			This help."
	echo "	martin [file]			Show the selected tip file."
	echo "	martin -edit [file]		Edit the selected file."
	echo "	martin -add [file] [text]	Fast add to the file. Text must be in quotes."
	return
fi

if [ "$xFILE" = "-edit" ]
then
	if [ "$xPLUS1" != "" ]
	then
		xFILENAME="$xPLUS1"
	fi
	$xEDITOR$HOME"/.local/bin/martin-"$xFILENAME".txt"
	return
fi

if [ "$xFILE" = "-add" ]
then
	if [ "$xPLUS2" != "" ]
	then
		xFILENAME="$xPLUS1"
		xPLUS1="$xPLUS2"
	fi
	cmd="echo \"$xPLUS1\" >> $HOME/.local/bin/martin-$xFILENAME.txt"
	eval $cmd
	cat $HOME/.local/bin/martin-$xFILENAME.txt
	return
fi

if [ "$xFILE" != "" ]
then
	xFILENAME="$xFILE"
fi
cat $HOME/.local/bin/martin-$xFILENAME.txt

