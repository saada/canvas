function loadGraphs(){
	jQuery.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "getAllGraphs"},
		dataType: "json",
		success:function(result){
			console.log("===DEBUG=== loadGraphs()");
			console.log(result);

			//populate dropdownlist
			jQuery.each(result, function(k, v){
	            jQuery("#graphList",top.document).append(
	            	'<option value="'+v.gid+'">'+v.name+'</option>');
	        });
		},
		error:function(xhr,opt,e){
			alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
		}
	});
}

function addGraph(name, xml)
{
	jQuery.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "addGraph", name: name, xml: xml},
		dataType: "json",
		success:function(result){
			console.log("===DEBUG=== addGraph()");
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

function getGraphById(gid)
{
	var myGraph = null;
	jQuery.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "getGraphById", gid: gid},
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

function edgeExists(source,target)
{
	for (var i = 0; i < source.getEdgeCount(); i++) {
		var tmp = source.getEdgeAt(i);
		if(tmp.getTerminal(false) == target)
			return true;
	};
	return false;
}

function validSwitch(name)
{
	var count = -1;
	if(typeof(name) == 'undefined')
		name = "mySwitch";
	var index = jQuery.inArray(name, SWITCHES);
	var tmp = name;
	while(index != -1) //if exists
	{
		count++;
		tmp = name.concat(count);
		index = jQuery.inArray(tmp, SWITCHES);
	};
	return tmp;
}