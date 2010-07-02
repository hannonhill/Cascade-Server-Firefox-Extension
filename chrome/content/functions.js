//Cascade Server Firefox Addon
//Author: Syl Turner, Martin Robinson, Hannon Hill, et al.
window.addEventListener("load",hh_windowLoad,true);
window.addEventListener("submit",hh_windowSubmit,true);

g_id = 0;
g_type = 0;
cmsURL = "";
is67Plus = false;

logins = new Array();

NOT_CASCADE = -1;
CASCADE_PAGE = 0;
LOGIN_PAGE = 1;
WORKFLOW_PAGE = 2;
PUBLISH_STATUS_PAGE = 3;
BULK_CHANGE_SELECTOR = 4;


function hh_windowLoad() 
{
	//hide our stuff on load.
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",hh_menuPopup,false);
	document.getElementById("cascadeGoTo").hidden = true;
	document.getElementById("cascadeView").hidden = true;
	document.getElementById("cascadeEdit").hidden = true;
	document.getElementById("cascadeCopy").hidden = true;
	document.getElementById("cascadeDelete").hidden = true;
	document.getElementById("cascadePublish").hidden = true;
	document.getElementById("deleteWorkflows").hidden = true;
	document.getElementById("deletePublishJobs").hidden = true;
	document.getElementById("cascadeBulkChange").hidden = true;
	document.getElementById("goToAssetBar").hidden = true;
	//document.getElementById("newMenu").hidden = true;
	document.getElementById("cascade-start").hidden = true;
	document.getElementById("cascade-logo").hidden = true;

	//grab the cms url!
	cmsURL = window._content.location.protocol + "//" + window._content.location.host;
	
	
	

}

//this controls all our menu items.
function hh_menuPopup(menuEvent)
{
	//initially hide all the menus you want hidden.
	document.getElementById("cascadeGoTo").hidden = true;
	document.getElementById("cascadeView").hidden = true;
	document.getElementById("cascadeEdit").hidden = true;
	document.getElementById("cascadeMove").hidden = true;
	document.getElementById("cascadeCopy").hidden = true;
	document.getElementById("cascadeDelete").hidden = true;
	document.getElementById("cascadePublish").hidden = true;
	document.getElementById("deleteWorkflows").hidden = true;
	document.getElementById("deletePublishJobs").hidden = true;
	document.getElementById("cascadeBulkChange").hidden = true;
	document.getElementById("goToAssetBar").hidden = true;
	//document.getElementById("newMenu").hidden = true;
	document.getElementById("cascade-start").hidden = true;
	document.getElementById("cascade-logo").hidden = true;
	
	//our thing that checks where our mouse is clicking
	var cm = gContextMenu;	
	
	//if they do exist, then show the Cascade buttons on the right-click menu.
	if (in_cascade()) {

		
		document.getElementById("cascade-start").hidden = false; //show the menu separator
		document.getElementById("cascade-logo").hidden = false; //show our sweet logo
		//document.getElementById("newMenu").hidden = false;	//show the New Assets menu
		document.getElementById("cascadeGoTo").hidden = false;	//show the New Assets menu
		
		//if you right click on the workflows screen, then show the "Delete All Workflows" button
		if (page_type() == WORKFLOW_PAGE) {

			//check to see if there is one or more workflows to delete
			var workflows = Array();
			var links = window._content.document.getElementsByTagName("a");
			//get all the workflow links
			for (var i=0;i<links.length;i++)
			{
				if (links[i].className == "icon-workflowdefinition")
				{
					workflows.push(links[i].href);
				}
			}
			if (workflows.length > 0)
			{
				document.getElementById("deleteWorkflows").hidden = false;
			}
		}
		
		//if you right click on the publish, then show the "Delete All Publish Jobs" button
		if (page_type() == PUBLISH_STATUS_PAGE) {

			//check to see if there is one or more publish jobs to delete
			var jobs = Array();
			var links = window._content.document.getElementsByTagName("a");
			//get all the cancel links
			for (var i=0;i<links.length;i++)
			{
				if (links[i].className == "icon-delete")
				{
					jobs.push(links[i].href);
				}
			}
			if (jobs.length > 0)
			{
				document.getElementById("deletePublishJobs").hidden = false;
			}
		}
        
        if (page_type() == BULK_CHANGE_SELECTOR) {
        	document.getElementById("cascadeBulkChange").hidden = false;
        }

		//if you're on a link, get it's information
		if (cm.onLink) {
            var link_info = get_link_info(cm.target);

			// if this is a link to an asset
			if (link_info["asset"] == true) {
				
				//set global variables because i can't seem to pass these to the function properly...
				g_id = link_info["id"];
				g_type = link_info["type"];
				
				//show Edit, Copy and Delete
	            document.getElementById("cascadeView").hidden = false;	            
				document.getElementById("cascadeEdit").hidden = false;
				//if this is 6.7+, show move/rename, hide edit if it's a container
				if(window._content.document.getElementById("utility-nav").getElementsByTagName("ul")[0].getElementsByTagName("li").length == 5)
				{
					document.getElementById("cascadeMove").hidden = false;
					// hide edit if it's a container, but there is edit for asset factory containers
					if(g_type.indexOf("container") != -1 && g_type != "assetfactorycontainer")
					{
						document.getElementById("cascadeEdit").hidden = true;
					}
				}
				document.getElementById("cascadeCopy").hidden = false;		
				document.getElementById("cascadeDelete").hidden = false;
				document.getElementById("goToAssetBar").hidden = false;
				
				//Only show publish on publishable assets (pages, files and folders)		
				if (g_type == "page" || g_type == "folder" || g_type == "file" || g_type == "publishset" || g_type == "target" || g_type == "destination")
				{
					document.getElementById("cascadePublish").hidden = false;			
				}
				
				if (g_type == "workflow" || g_type == "message")
				{
					document.getElementById("cascadeEdit").hidden = true;
					document.getElementById("cascadeCopy").hidden = true;
				}
			}
		}	
	}
}


function hh_windowSubmit(form) {

    if (page_type() == LOGIN_PAGE) {
	    var host = window._content.location.host;
        var login = new Array();
        login['username'] = window._content.document.forms[0].elements[1].value;
        login['password'] = window._content.document.forms[0].elements[2].value;
        logins[host] = login;
    }
}

function get_link_info(link) {
    var to_ret = new Array();
    to_ret["asset"] = false;

        var regex1 = new RegExp(/id=(.*?)(&|$|')/);
        var regex2 = new RegExp(/type=(.*?)(&|$|')/);

        if (link.href.match(regex1) && link.href.match(regex2)) {

            var match = regex1.exec(link.href);
            var id = match[1];
            match = regex2.exec(link.href);
            var type = match[1];

            to_ret["type"] = type;
            to_ret["id"] = id;

            to_ret["asset"] = true;

        }

    return to_ret;
}


function in_cascade() {

    if (page_type() == LOGIN_PAGE || page_type() == NOT_CASCADE) {
        return false;
    } else {
		cmsURL = window._content.location.protocol + "//" + window._content.location.host;
        return true;	
    }
}

function page_type() {
	url = window._content.location.href;

    // not inside of cascade, so do this check first
    if ((url.indexOf('/login.act') != -1) || (url.indexOf('/loginsubmit.act') != -1))
        return LOGIN_PAGE;
     
	//a terrible check to see if you're in cascade...  there's probably a better way than this... 
	//just checks to see if all those id's exist...  
	if (!(window._content.document.getElementById("wrapper") && window._content.document.getElementById("header") && window._content.document.getElementById("current-user")))
        return NOT_CASCADE;

    else if (url.indexOf('/publisherstatus.act') != -1)
        return PUBLISH_STATUS_PAGE;
  
    else if (url.indexOf('/home.act?tab=w') != -1)
        return WORKFLOW_PAGE;

    else if (url.indexOf('/entity/bulkchange/submit/generatelist.act') != -1)
        return BULK_CHANGE_SELECTOR;
    
    else return CASCADE_PAGE;

}
