#!/bin/bash

set -e

ROOT=$(realpath $(dirname "$0"))
NAME="inlinemoji"
DIST_DIR="$ROOT/dist"
EXT_DIR="$NAME"
SCRIPT_DIR="scripts"
EMOJI_FILE="$DIST_DIR/emojis.js"

cd "$root"

echo "Cleaning build directory..."
rm -rf "$DIST_DIR"
if [ "$1" = "clean" ]; then exit; fi

mkdir -p "$DIST_DIR"

echo "Packaging extension..."
cp "$EXT_DIR/manifest.json" "$DIST_DIR/"

echo "Adding dataset..."
node "$ROOT/$SCRIPT_DIR/build_map.js" |
    cat - "$EXT_DIR/$NAME.js" > "$DIST_DIR/$NAME.js"

echo "Done! See $DIST_DIR"
