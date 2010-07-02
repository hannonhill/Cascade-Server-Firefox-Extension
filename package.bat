@echo off
cls
echo Cascade Server Firefox Extension "build script"
echo Removing old cascade.xpi
del cascade.xpi
echo Creating cascade.xpi...
"%PROGRAMFILES%\7-zip\7z.exe" a -tzip -r -x!*.svn -x!*.project -x!readme.txt -x!syl.turner@hannonhill -x!update.rdf -x!*.bat -x!*.sh cascade.xpi

