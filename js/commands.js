// <AJAX>
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
			loadGraph();	//init graph current selection from dropdown
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
			jQuery("#graphList", top.document)
				.append('<option value="'+result.gid+'">'+result.name+'</option>')
				.val(result.gid);
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

function deleteGraph()
{
	gid = jQuery('#graphList',top.document).val();
	jQuery.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "deleteGraph", gid: gid},
		async: true,
		success:function(result){
			clearGraph();
			alert("Successfully removed graph");
			console.log(result);
			$("#graphList option[value="+gid+"]", top.document).remove();
			loadGraph();
		},
		error:function(xhr,opt,e){
			alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
		}
	});
}

// </AJAX>

function loadGraph()
{
	initLoad(getGraphById(jQuery('#graphList',top.document).val()));	//on change, change graph with selection from dropdown
}

function edgeExists(source,target)
{
	for (var i = 0; i < source.getEdgeCount(); i++) {
		var tmp = source.getEdgeAt(i);
		if(tmp.getTerminal(false) == target)
			return true;
	}
	return false;
}

function getValidName(name)
{
	var count = 0;
	var index = jQuery.inArray(name, CELLS);
	var tmp = name;
	while(index != -1) //if exists
	{
		count++;
		tmp = name.concat(count);
		index = jQuery.inArray(tmp, CELLS);
	}
	return tmp;
}

function clearGraph(){
	initLoad('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>');
}

function startLoadingScreen () {
	jQuery("#loadSplash").prepend('<div id="splash" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:white;z-index:1;"> <center id="splash" style="padding-top:230px;">	<img src="editors/images/loading.gif"> </center></div>');
}

function stopLoadingScreen () {
	// Fades-out the splash screen after the UI has been loaded.
	var splash = document.getElementById('splash');
	if (splash !== null)
	{
		try
		{
			mxEvent.release(splash);
			mxEffects.fadeOut(splash, 100, true);
		}
		catch (e)
		{

			// mxUtils is not available (library not loaded)
			splash.parentNode.removeChild(splash);
		}
	}
}

//Helper functions
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};