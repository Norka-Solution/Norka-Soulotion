#!/bin/zsh
# Norka's identity in one place: build the brand files from tokens.json and copy them into every product.
# Run from anywhere:  zsh Norka-Website/brand/sync.sh   (products are found next to Norka-Website)
# Then commit the copied files in each product. Each product maps the --norka-* variables / NorkaBrand onto its own theme.
set -e
B=${0:A:h}
P=${B:h:h}   # the folder holding all Norka projects
node $B/build.mjs

copy() { # copy <product folder> <dest dir> <files...>
  local dir=$P/$1 dest=$2; shift 2
  [ -d $dir ] || { echo "skip $1 (not found)"; return; }
  mkdir -p $dir/$dest
  for f in "$@"; do cp $B/$f $dir/$dest/; done
  echo "→ $1/$dest"
}
copy Norka-ERP-Frontend styles/tokens dist/norka-brand.css
copy Norka-Assistant web/src/brand dist/norka-brand.css logo.png logo-white.png
# the ERP serves the plain mark as /norka-logo.png (blue) and /norka-logo-white.png
[ -d $P/Norka-ERP-Frontend ] && cp $B/logo-blue.png $P/Norka-ERP-Frontend/public/norka-logo.png && cp $B/logo-white.png $P/Norka-ERP-Frontend/public/norka-logo-white.png && echo "→ Norka-ERP-Frontend/public (logos)"
copy Norka-Mobile-Platform constants dist/norka-brand.ts
