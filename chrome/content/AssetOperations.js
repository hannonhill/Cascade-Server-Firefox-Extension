
/************************
The right-click "New Assets" menu functions
*************************/
function newFolder()
{
	window._content.location = cmsURL+"/cms/entity/start.act?assetFactoryId=f18f28f0c0a8080800766b4203d6cac7&assetFactoryType=folder&type=folder";
}

function newPage()
{	
	window._content.location = cmsURL+"/cms/entity/start.act?assetFactoryId=5bf6b7940a00018200cb94b78e72ce17&assetFactoryType=page&type=page";
}

function newFile()
{	
	window._content.location = cmsURL+"/cms/entity/start.act?assetFactoryId=f1ec9717c0a8080801cbf6bb05239a74&assetFactoryType=file&type=file";
}

function newStylesheet()
{	
	window._content.location = cmsURL+"/cms/entity/start.act?assetFactoryId=04ed8dd4c0a8000300c80825a0478b71&assetFactoryType=stylesheet&type=stylesheet";
}

function newBlock()
{	
	window._content.location = cmsURL+"/cms/entity/start.act?assetFactoryId=6e329f5dc0a8015201650ceab3a66c55&assetFactoryType=block&type=block";
}

function newTemplate()
{	
	window._content.location = cmsURL+"/cms/entity/start.act?assetFactoryId=04ed002bc0a8000300c80825ded9405f&assetFactoryType=template&type=template";
}

function newSymlink()
{	
	window._content.location = cmsURL+"/cms/entity/start.act?assetFactoryId=f2003157c0a808080190690ee6802c81&assetFactoryType=symlink&type=symlink";
}

/*****************
View asset
******************/
function viewAsset()
{	
	window._content.location = cmsURL+"/cms/entity/open.act?type="+g_type+"&id="+g_id;
}

/*****************
Edit asset
******************/
function editAsset()
{	
	window._content.location = cmsURL+"/cms/entity/edit.act?type="+g_type+"&id="+g_id;
}

/*****************
Copy asset
******************/
function copyAsset()
{	
	window._content.location = cmsURL+"/cms/entity/copy.act?type="+g_type+"&id="+g_id;
}

/*****************
Delete asset
******************/
function deleteAsset()
{	
	window._content.location = cmsURL+"/cms/entity/delete.act?type="+g_type+"&id="+g_id;
}

/*****************
Publish asset
******************/
function publishAsset()
{	
	window._content.location = cmsURL+"/cms/entity/publish.act?type="+g_type+"&id="+g_id;
}


/******************
Go To Asset stuff
*******************/
function goToAssetDialog() {

    if (!in_cascade()) return;	
		
	var kenny = logins[window._content.location.host];
	if (logins[window._content.location.host] == undefined)
	{
		//Notify the user that they need to log back into Cascade
		alert("Please log out and log back into Cascade to use this function");
		return;
		/* I'm too lazy to bother using web services to check to see if that's a valid username and password, so i might come back to this later.
		var params = {userpass:null};
		window.openDialog("chrome://cascade/content/dialogs/request-login.xul",
                      "requestlogin", "chrome,dialog,modal", params).focus();
		
		if (params.userpass) 
		{			
			var login = new Array();
			login['username'] = params.userpass["username"];
			login['password'] = params.userpass["password"];
			logins[window._content.location.host] = login;
		}
		else {
			return;
		}	
		*/		
	}
	
	if (logins[window._content.location.host] != undefined)
	{
		//these are the params we'll get back from the dialog box	
		var params = {out:null};
	    window.openDialog("chrome://cascade/content/dialogs/gotoasset.xul",
	                      "gotoasset", "chrome,dialog,modal", params).focus();

	    if (params.out) {
	        params.out["func"] = go_to_asset;
	        get_id_from_path(params.out);
	    } else {
	        // yeah
	    }
	}    
}

function get_id_from_path(op) {

    var login = logins[window._content.location.host];

    var username = login['username'].replace(/&/g, '&amp;');
    username = username.replace(/</g, '&lt;');
    username = username.replace(/>/g, '&gt;');

    var password = login['password'].replace(/&/g, '&amp;');
    password = password.replace(/</g, '&lt;');
    password = password.replace(/>/g, '&gt;');

    var message = '<?xml version="1.0" encoding="UTF-8"?>'
     + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/'
     + 'soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" '
     + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
     + '<soapenv:Body>'
     + '<read xmlns="http://www.hannonhill.com/ws/ns/AssetOperationService">'
     + '<authentication>'
     + '<password>' + password + '</password>'
     + '<username>' + username + '</username>'
     + '</authentication>'
     + '<identifier>'
     + '<path>' + op["path"] + '</path>'
     + '<type>' + op["type"] + '</type>'
     + '</identifier>'
     + '</read>'
     + '</soapenv:Body>'
     + '</soapenv:Envelope>';

	 ws_url = window._content.location.protocol + "//"
             + window._content.location.host
             + "/ws/services/AssetOperationService";
    
    request = new XMLHttpRequest();

    request.open("POST", ws_url);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            var regex = new RegExp(/<id>(.*?)<\/id>/);
            var response =
            request.responseText.replace(/<children>(.*?)<\/children>/, "");

            if (response.match(regex)) { // found id

                /* extract id */
                var match = regex.exec(response);
                op["id"] = match[1]; // get id
                op["func"](op); // call func

            } else { // failure
                alert("Could not find asset.");
            }
        }
    }
    
    request.setRequestHeader("Host", window._content.location.host);
    request.setRequestHeader("Content-Type", "text/xml;");
    request.setRequestHeader("SOAPAction", "\"\"");
    
    request.send(message);
}

function go_to_asset(vars) {
    g_type = vars["type"];
    g_id = vars["id"]; 

    viewAsset(); 
}
//NOT BEING USED JUST NOW
//check if the username/password entered is valid
/*function loginCheck(arr)
{
	var login = logins[window._content.location.host];

    var username = login['username'].replace(/&/g, '&amp;');
    username = username.replace(/</g, '&lt;');
    username = username.replace(/>/g, '&gt;');

    var password = login['password'].replace(/&/g, '&amp;');
    password = password.replace(/</g, '&lt;');
    password = password.replace(/>/g, '&gt;');

    var message = '<?xml version="1.0" encoding="UTF-8"?>'
     + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/'
     + 'soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" '
     + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
     + '<soapenv:Body>'
     + '<authenticate xmlns="http://www.hannonhill.com/ws/ns/SecurityService">'
     + '<authentication>'
     + '<password>' + password + '</password>'
     + '<username>' + username + '</username>'
     + '</authentication>'     
     + '</authenticate>'
     + '</soapenv:Body>'
     + '</soapenv:Envelope>';

	 ws_url = window._content.location.protocol + "//"
             + window._content.location.host
             + "/ws/services/SecurityService";
    
    request = new XMLHttpRequest();

    request.open("POST", ws_url);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alert();
        }
    }
    
    request.setRequestHeader("Host", window._content.location.host);
    request.setRequestHeader("Content-Type", "text/xml;");
    request.setRequestHeader("SOAPAction", "\"\"");
    
    request.send(message);
}*/
