# Shell skript um grunt laufen zu lassen, wenn grunt nur lokal installiert ist
# Unix Version

#!/bin/sh


# npm Module neu laden, wenn das File "node_modules/grunt-cli/bin/grunt" nicht existiert
[ ! -f node_modules/.bin/grunt ] && echo "Building npm modules:" && npm rebuild

# Grunt unter dem Pfad node_modules/grunt-cli/bin starten
# $* bedeutet, dass alle Paramter wie -V (version) übernommen werden sollen
node_modules/.bin/grunt $*