/*********************************
	The Delete All Workflows function
***********************************/
var xmlHttp = new XMLHttpRequest();
function deleteWorkflows()
{
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
	
	//use global cmsURL variable to get the protocol, address and port, then append the delete link.
	var delURL = cmsURL+"/cms/entity/submitdelete.act";
	//loop through each workflow
	for (var i=0;i<workflows.length;i++)
	{
		var id = workflows[i].split("id=");
		xmlHttp.open("POST",delURL,false);
		
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlHttp.send("id="+id[1]+"&type=workflow&workflowCapable=false&publishCapable=false");
	}
	var status = xmlHttp.statusText;
	//if successful, "OK" will be returned
	if (status == "OK")
	{
		alert("All " + workflows.length + " workflows have been deleted successfully!");
		window._content.location.reload(false);
	}
	else
	{
		alert("An error has occurred when deleting workflows... oops!");
	}
}
