Cascade Firefox Extension Readme
================================

Contents:
1. Set up your system for dynamic development
2. How to package it
3. Public Release
4. Helpful links
5. Release log

-------------------
1. Set up your system for dynamic development
===================
Dynamic development will help with modifying and testing the changes made to the extension, instead of having to repackage everything everytime you make a change.
1.	Create a new Firefox user profile so you don't accidentally screw up your normal browsing profile.  
	- Consult this link on how to do that: http://www.borngeek.com/firefox/profile-tutorial/
2.	Locate your new profile's directory (see link above on how to do that).
3.	Copy the "syl.turner@hannonhill" file the profile's directory.  
4. 	Edit the "syl.turner@hannonhill" file so it points to the directory that hold the "install.rdf" and "chrome.manifest" files.
5.	Now, when you edit the extension's files, just restart Firefox to that profile to see the changes!

--------------------
2.	How to package it 
====================
There's no real compiling used, just zipping!
1.	Now put all this into one zip:
	- install.rdf
	- chrome.manifest
	- chrome/
		- content/
			- dialogs/
				- gotoasset.xul...etc.								
			- AssetOperations.js...etc.
		- skin/
			- assetfactory.png...etc.
	*** DO NOT include update.rdf, syl.turner@hannonhill, or this readme.txt
2.	Name the file "cascade.xpi"
3.	Release!



-----------------
3.	Public Release
=================
*** COMING SOON!  
There's some weird stuff to do to make sure it updates by itself.  I honestly don't remember how it's done.
It has something to do with update.rdf and install.rdf.  You have to create some kind of hash for both of them.
Then upload update.rdf and cascade.xpi to http://www.hannonhill.com/downloads/. 

https://developer.mozilla.org/en/Extension_Versioning%2c_Update_and_Compatibility#Securing_Updates

I think that has the information we need.  I'll check it out later.

-----------------
4.	Helpful Links
=================
- http://www.borngeek.com/firefox/toolbar-tutorial/ - It's a toolbar tutorial, but a lot of the concepts are the same.
- http://www.xulplanet.com/ - XUL, the XML schema used for Mozilla GUI elements, reference site.
- http://kb.mozillazine.org/Extension_development - A wiki about extensions.

-----------------
5.	Release Log
=================
- 05/02/2008 - 1.3.7 released I guess?  Missing some numbers in there...  I think this release was actually later
- 06/11/2007 - 1.2 released internally.  Might release to public soon.
- ??/??/2007 - 1.1 was realeased at some point?
- 03/16/2007 - 1.0 released internally at Hannon Hill!