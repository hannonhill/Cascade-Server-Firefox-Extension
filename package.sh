#!/bin/sh
echo "Cascade Firefox Extension Packager"
rm cascade.xpi
zip -r cascade.xpi chrome/ * -x *.svn -x readme.txt -x package.* -x update.rdf
echo "cascade.xpi is ready to play with"
