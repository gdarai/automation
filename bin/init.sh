#!/bin/sh

xrandr --newmode "1440x900_60.00"  106.50  1440 1528 1672 1904  900 903 909 934 -hsync +vsync
xrandr --addmode DP1 1440x900_60.00
xrandr --output DP1 --mode 1440x900_60.00
