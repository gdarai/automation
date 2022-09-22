#!/bin/bash

xCMD=$1
xNAME=$2

xFile1="/home/tr949/.local/bin/go-names.txt"
xFile2="/home/tr949/.local/bin/~go-names.txt"
if [ "$xCMD" == "add" ]
then
	xA="eval grep -P '^$xNAME\t' "$xFile1
	xB=`$xA`
	if [ "$xB" == "" ]
	then
		echo "Adding name "$xNAME": "$(pwd)
		xA="echo -e \""$xNAME"\t"$(pwd)"\" >> "$xFile1
		eval $xA
	else
		echo "Rewriting name "$xNAME": "$(pwd)
		xA=$(pwd)
		xA="eval echo \""$(pwd)"\" | sed 's/\//\\\\\//g'"
		xA=`$xA`
		mv $xFile1 $xFile2
		xA="sed 's/"$xNAME"\t.*/"$xNAME"\t"$xA"/' "$xFile2" > "$xFile1
		eval $xA
	fi
	return
fi

if [ "$xCMD" == "del" ]
then
	xA="eval grep -P '^$xNAME\t' "$xFile1
	xB=`$xA`
	if [ "$xB" == "" ]
	then
		echo "Name "$xNAME": Does not exit, cannot delete."
	else
		echo "Deleting name "$xNAME
		mv $xFile1 $xFile2
		xA="sed '/"$xNAME"\t.*/d' "$xFile2" > "$xFile1
		eval $xA
	fi
	return
fi

if [ "$xCMD" == "edit" ]
then
	eval "gedit "$xFile1
	return
fi

if [ "$xCMD" != "" ]
then
	xA="eval grep -P '^$xCMD\t' "$xFile1
	xB=`$xA`
	if [ "$xB" != "" ]
	then
		xA=($xB)
		xA="cd "${xA[1]}
		echo "Running "$xA
		$xA
	else
		echo "Name "$xCMD": Does not exist, cannot go."
	fi
	return
fi

echo "Path memory utility, G. Darai 2014"
echo "go [<COMMAND>] [<NAME>]        go myPlace       go add New   go del Last"
echo "<COMMAND> : add, del, edit"
echo "<NAME> : Any name for current path"
echo "Currenth names and paths:"
while read -r xLINE
do
	xLINE1=($xLINE)
	echo "Name: \""${xLINE1[0]}"\": "${xLINE1[1]}
done < $xFile1



