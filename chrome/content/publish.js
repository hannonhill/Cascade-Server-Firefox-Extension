/*************
	Delete all publish jobs
**************/
var xmlHttp = new XMLHttpRequest();
function deletePublishJobs()
{
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
	
	//the url of the delete publish jobs
	var delURL = cmsURL+"/cms/cancelpublishjob.act";
	
	//loop through each publish job
	for (var i=0;i<jobs.length;i++)
	{
		var id = jobs[i].split("publishRecordId=");
		xmlHttp.open("POST",delURL,false);
		
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlHttp.send("publishRecordId="+id[1]+"&confirmed=true");
	}
	var status = xmlHttp.statusText;
	//if successful, "OK" will be returned
	if (status == "OK")
	{
		alert("All " + jobs.length + " publish jobs have been deleted successfully!");
		window._content.location.reload(false);
	}
	else
	{
		alert("An error has occurred when canceling publish jobs... oops!");
	}
}