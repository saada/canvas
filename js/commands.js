//This is where the graph app starts up
$(top.document).ready(function(){
	loadGraphs();			// load graph list from database
	attachButtonEvents();	// the name is self explanatory
});

// <AJAX>
function loadGraphs(){
	$.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "getAllGraphs"},
		dataType: "json",
		success:function(result){
			console.log("===DEBUG=== loadGraphs()");
			console.log(result);

			//populate dropdownlist
			$.each(result, function(k, v){
				$("#graphList",top.document).append(
					'<option value="'+v.gid+'">'+v.name+'</option>');
			});

			main(document.getElementById('graphContainer'),
				document.getElementById('toolbarContainer'),
				document.getElementById('sidebarContainer'),
				document.getElementById('statusContainer'));
		},
		error:function(xhr,opt,e){
			alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
		}
	});
}

function addGraph(name, xml)
{
	$.ajax({
		url: "/canvas/canvas/commands.php",
		type: "POST",
		data: {action : "addGraph", name: name, xml: xml},
		dataType: "json",
		success:function(result){
			console.log("===DEBUG=== addGraph()");
			console.log(result);
			alert("Successfully added graph: "+result.name+". Id="+result.gid);
			$("#graphList", top.document)
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
	$.ajax({
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
	$.ajax({
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
	gid = $('#graphList',top.document).val();
	$.ajax({
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
	initLoad(getGraphById($('#graphList',top.document).val()));	//on change, change graph with selection from dropdown
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
	var index = $.inArray(name, CELLS);
	var tmp = name;
	while(index != -1) //if exists
	{
		count++;
		tmp = name.concat(count);
		index = $.inArray(tmp, CELLS);
	}
	return tmp;
}

function clearGraph(){
	initLoad('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>');
}

function startLoadingScreen () {
	// $("#loadSplash").prepend('<div id="splash" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:white;z-index:1;"> <center id="splash" style="padding-top:230px;">	<img src="editors/images/loading.gif"> </center></div>');
	$('#loadSplash').fadeIn("fast");
}

function stopLoadingScreen () {
	// Fades-out the splash screen after the UI has been loaded.
	// var splash = document.getElementById('splash');
	// if (splash !== null)
	// {
	// 	try
	// 	{
	// 		mxEvent.release(splash);
	// 		mxEffects.fadeOut(splash, 100, true);
	// 	}
	// 	catch (e)
	// 	{

	// 		// mxUtils is not available (library not loaded)
	// 		splash.parentNode.removeChild(splash);
	// 	}
	// }
	$('#loadSplash').fadeOut("fast");
}

//Helper functions
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

//Attach button events
function attachButtonEvents(){
	$('#graphList',top.document).change(function() {
		loadGraph();
	});

	$('#loadBtn',top.document).click(function() {
		loadGraph();
	});

	$('#clearBtn', top.document).click(function(){
		clearGraph();
	});

	$('#deleteBtn', top.document).click(function(){
		if(confirm("Delete graph?"))
			deleteGraph();
	});
}