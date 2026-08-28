#!/bin/bash
# Sync model diagrams and inventory from the relaton-models submodule.
# Called by CI before the VitePress build.
set -euo pipefail

SUBMODULE="vendor/relaton-models"
PUBLIC_MODELS="public/models"

if [ ! -d "$SUBMODULE/relaton/images" ]; then
  echo "error: $SUBMODULE/relaton/images not found (run: git submodule update --init)"
  exit 1
fi

mkdir -p "$PUBLIC_MODELS"

# Base model diagrams
cp "$SUBMODULE"/relaton/images/*.png "$PUBLIC_MODELS/"

# Flavour diagrams
for dir in "$SUBMODULE"/*/images; do
  flavour=$(basename "$(dirname "$dir")")
  case "$flavour" in relaton|basicdoc) continue ;; esac
  mkdir -p "$PUBLIC_MODELS/$flavour"
  cp "$dir"/*.png "$PUBLIC_MODELS/$flavour/" 2>/dev/null || true
done

# Inventory (machine-readable, for data-driven pages)
if [ -f "$SUBMODULE/_site/inventory.json" ]; then
  cp "$SUBMODULE/_site/inventory.json" public/inventory.json
fi

echo "sync-models: $(find "$PUBLIC_MODELS" -name '*.png' | wc -l | tr -d ' ') PNGs synced"
