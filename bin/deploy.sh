#!/bin/bash

xCMD=$1
xNAME=$2
xTGT=$3


xFile1="/home/martin/.local/bin/deploy-names.txt"
xFile2="/home/martin/.local/bin/~deploy-names.txt"
if [ "$xCMD" == "add" ]
then
	xA="eval grep -P '^$xNAME\t' "$xFile1
	xB=`$xA`
	if [ "$xB" == "" ]
	then
		echo "Adding name "$xNAME": "$(pwd)" >> "$xTGT
		xA="echo -e \""$xNAME"\t"$(pwd)"\t"$xTGT"\" >> "$xFile1
		eval $xA
	else
		echo "Rewriting name "$xNAME": "$(pwd)" >> "$xTGT
		xA=$(pwd)
		xA="eval echo \""$(pwd)"\t"$xTGT"\" | sed 's/\//\\\\\//g'"
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
		xA="cp -fr "${xA[1]}" "${xA[2]}
		echo "Running "$xA
		eval $xA
	else
		echo "Name "$xCMD": Does not exit, cannot go."
	fi
	return
fi

echo "Deploy utility, G. Darai 2017"
echo "deploy [<COMMAND>] [<NAME>] [<TARGET PATH>]"
echo "    deploy current"
echo "    deploy add New ~\target"
echo "    deploy del Last"
echo "<COMMAND> : add, del, edit"
echo "<NAME> : Any name for current path"
echo "<TARGET_PATH> : Where should be the current path copied"
echo "Currenth names, paths and target folders:"
while read -r xLINE
do
	xLINE1=($xLINE)
	echo "Name: \""${xLINE1[0]}"\": "${xLINE1[1]}" >> "${xLINE1[2]}
done < $xFile1



