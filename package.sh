#!/bin/sh
echo "Cascade Firefox Extension Packager"
rm cascade.xpi
zip -r cascade.xpi chrome/ * -x *.svn -x *.git -x readme.txt -x package.* -x update.rdf -x syl.turner@hannonhill
echo "cascade.xpi is ready to play with"
