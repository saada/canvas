function addGraph(name, xml)
{
	jQuery.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "addGraph", name: name, xml: xml},
		dataType: "json",
		success:function(result){
			console.log(result);
			alert("Successfully added graph: "+result.name+". Id="+result.gid);
			jQuery("#graphList", top.document).append('<option value="'+result.gid+'">'+result.name+'</option>');
		},
		error:function(xhr,opt,e){
			alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
		}
	});
}

function getGraph(name)
{
	var myGraph = null;
	jQuery.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "getGraph", name: name},
		dataType: "json",
		async: false,
		success:function(result){
			// alert("Successfully got graph: "+result.name+". Id="+result.gid);
			myGraph = result.content;
		},
		error:function(xhr,opt,e){
			alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
		}
	});
	return myGraph;
}