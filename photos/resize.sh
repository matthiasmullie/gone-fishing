#!/bin/bash

# identify is part of imagemagick
# sips ships with osx

if [ "$#" -ne 4 ]; then
    echo "Usage: resize.sh <source> <target> <width> <height>"
fi

SOURCE=$1
TARGET=$2
WIDTH=$3
HEIGHT=$4

if [ -d $SOURCE ]; then
    mkdir -p $TARGET

    for ORIGINAL in $SOURCE/*;
    do
        NEW=${ORIGINAL/$SOURCE/$TARGET}

        bash $0 $ORIGINAL $NEW $WIDTH $HEIGHT
    done
else
    AR=$(echo "scale=2;$WIDTH/$HEIGHT" | bc)
    ORIG_WIDTH=$(identify -format "%w" $SOURCE)
    ORIG_HEIGHT=$(identify -format "%h" $SOURCE)
    ORIG_AR=$(echo "scale=2;$ORIG_WIDTH/$ORIG_HEIGHT" | bc)

    cp $SOURCE $TARGET

    if [ $(echo "$ORIG_AR / $AR" | bc) -gt 0 ]; then
        sips --resampleHeight $HEIGHT $TARGET
    else
        sips --resampleWidth $WIDTH $TARGET
    fi

    echo "Processed $TARGET";
fi
