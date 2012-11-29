// Program starts here. Creates a sample graph in the
// DOM node with the specified ID. This function is invoked
// from the onLoad event handler of the document (see below).

//GLOBAL VARIABLES

var GLOBAL_GRAPH = null;	//global instance of the graph
var NUM_INTERFACES = 4;		//constant number of interfaces for non-switch cells

var CELLS = [];				//tracks the list of cells on the graph

function main(container, toolbar, sidebar, status)
{

	// Checks if the browser is supported
	if (!mxClient.isBrowserSupported())
	{
		// Displays an error message if the browser is not supported.
		mxUtils.error('Browser is not supported!', 200, false);
	}
	else
	{
		// Enables guides
	    mxGraphHandler.prototype.guidesEnabled = true;

		// Workaround for Internet Explorer ignoring certain CSS directives
		if (mxClient.IS_IE)
		{
			new mxDivResizer(container);
			new mxDivResizer(toolbar);
			new mxDivResizer(sidebar);
			new mxDivResizer(status);
		}

		// Creates a wrapper editor with a graph inside the given container.
		// The editor is used to create certain functionality for the
		// graph, such as the rubberband selection, but most parts
		// of the UI are custom in this example.
		var editor = new mxEditor();
		var graph = editor.graph;
		GLOBAL_GRAPH = graph;
		var model = graph.getModel();

		// Hook to return the mxImage used for the connection icon
		graph.connectionHandler.getConnectImage = function(state)
		{
			return new mxImage('images/connector.gif', 16, 16);
		};

		// Does not allow dangling edges
		graph.setAllowDanglingEdges(false);

		// Sets the graph container and configures the editor
		editor.setGraphContainer(container);

		//graph.ingnoreScrollbars = true;

		var config = mxUtils.load(
		'editors/config/keyhandler-commons.xml').
				getDocumentElement();
		editor.configure(config);

		// Shows a "modal" window when double clicking a vertex.
		// Enables new connections
		graph.setConnectable(true);

	    // Disables HTML labels for swimlanes to avoid conflict
		// for the event processing on the child cells. HTML
		// labels consume events before underlying cells get the
		// chance to process those events.
		//
		// NOTE: Use of HTML labels is only recommended if the specific
		// features of such labels are required, such as special label
		// styles or interactive form fields. Otherwise non-HTML labels
		// should be used by not overidding the following function.
		// See also: configureStylesheet.
		graph.isHtmlLabel = function(cell)
		{
			return true;
		}

		//...
		graph.getLabel = function(cell){
			if(cell.value!=null){
				if(cell.isEdge())
				{
					if(cell.getTerminal().value.type == "Switch")
					{
						for (var i = 0; i < cell.getTerminal(true).getEdgeCount(); i++) {
							if(cell.getTerminal(true).getEdgeAt(i) == cell)
							{
								return "eth"+i+":"+cell.value;
							}
						};
					}
					return "";
					// return cell.getTerminal(false).value.edgeFields
				}
				return cell.value.label;
			}
			return mxGraph.prototype.getLabel.apply(this,arguments);
		}


		//Prevent and validate edge connections
		graph.getEdgeValidationError  = function(edge, source, target){
		    if(source.value.type != 'Switch'
		    	&& target.value.type == 'Switch'
		    	&& source.getEdgeCount() < NUM_INTERFACES	//Anything not a switch
		    	&& !edgeExists(source,target)				//Prevent duplicate edges
		    	)
		    {
		    	return mxGraph.prototype.getEdgeValidationError.apply(this, arguments); // "supercall"
		    }
		    if(source.value.type == "Switch")
		    	return "Switch cannot target other elements!";
		    else
		    	return source.value.type+" must target any disconnected Switch!";
		};

		model.cellRemoved = function(cell){
			if(cell.isVertex())
			{
				console.log("***CELL REMOVED");
				CELLS.remove(CELLS.indexOf(cell.value.name));
				console.log(CELLS);
				console.log(cell);
			}
			else if (cell.isEdge())
			{

			}
			return mxGraphModel.prototype.cellRemoved.apply(this, arguments);
		};

		//on load graph
		model.cellAdded = function(cell){
			if(cell.isVertex())
			{
				CELLS.push(cell.value.name);
				console.log("***Cell added!");
				console.log(CELLS);
			}
			else if(cell.isEdge())
			{
			}
			return mxGraphModel.prototype.cellAdded.apply(this, arguments);
		};

		//on drag and drop new cell
		graph.addCell = function(cell,parent,index,source,target){
			if(cell.isVertex()){
				var validName = getValidName(cell.value.name);
				cell.value.name = validName;
				cell.value.label = '<img src="images/icons48/'+cell.value.type.toLowerCase()+'.png" width="48" height="48">'+
				 					'<h1 style="margin:0px;">'+validName+'</h1>';
				console.log("***Adding cell...");
			}
			else if(cell.isEdge())
			{
				cell.setValue("192.168.2.1");
			}
			return mxGraph.prototype.addCell.apply(this, arguments);

		}


		// Adds all required styles to the graph (see below)
		configureStylesheet(graph);

		// Adds sidebar icon.
		var ClientObject = new Client('myClient');
		var client = new mxCell(ClientObject,new mxGeometry(0,0,150,150));
		client.setVertex(true);
		client.setConnectable(true);

		client.value.type = 'Client';
		client.value.ip = '192.168.1.1';
		client.value.interface = '1';
		addSidebarIcon(graph, sidebar,client,'images/icons48/client.png');

		// Adds sidebar icon.
		var InternetObject = new Internet('myInternet');
		var internet = new mxCell(InternetObject,new mxGeometry(0,0,150,150));
		internet.setVertex(true);
		internet.setConnectable(true);

		internet.value.type = 'Internet';
		internet.value.ip = '192.168.1.1';
		internet.value.interface = '1';
		addSidebarIcon(graph, sidebar,internet,'images/icons48/internet.png');

		// Adds sidebar icon.
		var RouterObject = new Router('myRouter');
		var router = new mxCell(RouterObject,new mxGeometry(0,0,150,150));
		router.setVertex(true);
		router.setConnectable(true);

		router.value.type = 'Router';
		router.value.ip = '192.168.1.1';
		router.value.interface = 1;
		addSidebarIcon(graph,sidebar,router,'images/icons48/router.png');

		//Adds sidebar icon
		var ServerObject = new Server('myServer');
		var server= new mxCell(ServerObject,new mxGeometry(0,0,150,150));
		server.setVertex(true);
		server.setConnectable(true);

		server.value.type = 'Server';
		server.value.ip = '192.168.1.1';
		server.value.interface = 1;
		addSidebarIcon(graph,sidebar,server,'images/icons48/server.png');

		//Adds sidebar icon
		var SwitchObject = new Switch('mySwitch');
		var sw= new mxCell(SwitchObject,new mxGeometry(0,0,150,150));
		sw.setVertex(true);
		sw.setConnectable(true);

		sw.value.type = 'Switch';
		sw.value.ip = '192.168.1.1';
		sw.value.interface = 1;
		addSidebarIcon(graph,sidebar,sw,'images/icons48/switch.png');

		// Defines a new export action
		editor.addAction('export', function(editor, cell)
		{
			if(!isIconConnected(graph))
			{
				alert("some icons are not connected");
			}else if(!isSwitchConnected(graph))
			{
				alert("123");
			}else
			{
			var xmlform = new mxForm();

			var textarea = document.createElement('textarea');
			textarea.style.width = '400px';
			textarea.style.height = '400px';
			var enc = new mxCodec(mxUtils.createXmlDocument());
			var node = enc.encode(editor.graph.getModel());
			textarea.value =mxUtils.getPrettyXml(node);
			var xmlfield = xmlform.addField('',textarea);

			// Defines the function to be executed when the
	  // OK button is pressed in the dialog
			var okFunction = function()
			{
				mxUtils.save('\\<?php echo $_GET["lab_id"] . ".xml"; ?>.xml',xmlfield.value);
				alert("the xml file has been saved.");
				wnd.destroy();
			}
			var cancelFunction = function()
			{
				wnd.destroy();
			}
			xmlform.addButtons(okFunction, cancelFunction);
			wnd = showModalWindow(graph,'XML',xmlform.table, 410, 460);
			}
		});

		addToolbarButton(editor, toolbar, 'export', 'Export', 'images/export1.png');

		// Defines a load action
		editor.addAction('load',function(editor,cell)
		{
			var xml = mxUtils.load('myfile/<?php echo $_GET["lab_id"] . ".xml"; ?>');
			var doc = xml.getDocumentElement();
			var dec = new mxCodec(doc);
			dec.decode(doc,graph.getModel());
			graph.getModel().endUpdate();
		});

		addToolbarButton(editor,toolbar,'load','Load','images/export1.png')
		// ---
		// Defines the icon configure action
		editor.addAction('configure', function(editor, cell)
		{
			if (cell == null)
			{
				cell = graph.getSelectionCell();
			}
			showProperties(graph, cell);
		});

		addToolbarButton(editor, toolbar, 'save', 'Save', 'images/export1.png');

		// Defines a save action for DB ~function written by Moody
		editor.addAction('save', function(editor, cell)
		{
			if(!isIconConnected(graph))
			{
				alert("some icons are not connected");
			}else if(!isSwitchConnected(graph))
			{
				alert("123");
			}else
			{
				var xmlform = new mxForm();

				var namefield = document.createElement('textarea');
				namefield.style.width = '370px';
				namefield.style.height = '20px';
				namefield.value = "Graph1";
				var gName = xmlform.addField('Name',namefield);

				var textarea = document.createElement('textarea');
				textarea.style.width = '370px';
				textarea.style.height = '300px';
				var enc = new mxCodec(mxUtils.createXmlDocument());
				var node = enc.encode(editor.graph.getModel());
				textarea.value =mxUtils.getPrettyXml(node);
				textarea.setAttribute('readOnly','readonly');
				var xmlfield = xmlform.addField('XML',textarea);

				// Defines the function to be executed when the
		  		// OK button is pressed in the dialog
				var okFunction = function()
				{
					// mxUtils.save('\\<?php echo $_GET["lab_id"] . ".xml"; ?>.xml',xmlfield.value);
					addGraph(gName.value,xmlfield.value);

					wnd.destroy();
				}
				var cancelFunction = function()
				{
					wnd.destroy();
				}
				xmlform.addButtons(okFunction, cancelFunction);
				wnd = showModalWindow(graph,'Information Form',xmlform.table, 410, 380);
			}
		});

		// Installs context menu
		graph.panningHandler.factoryMethod = function(menu, cell, evt)
		{
			if(cell != null)
			{
				if(graph.getModel().isVertex(cell))

				{
					menu.addItem('Copy', null, function()
					{
					  editor.execute('copy');
					});
					menu.addItem('Paste', null, function()
					{
						editor.execute('paste');
					});
				  	menu.addItem('Delete', null, function()
					{
						editor.execute('delete');
					});
					menu.addItem('Configure', null, function()
					{
						editor.execute('configure');
					});
				}

				else if(graph.getModel().isEdge(cell))
				{
				  	menu.addItem('Delete', null, function()
					{
						editor.execute('delete');
					});
					menu.addItem('Configure', null, function()
					{
						editor.execute('configure');
					});
				}
			}

			else
			{
					menu.addItem('Paste', null, function()
					{
						editor.execute('paste');
					});
			}
		};

		var e = document.getElementById('toolbarContainer');
		e.appendChild(mxUtils.button('Zoom In', function()
		{
			graph.zoomIn();
		}));
		e.appendChild(mxUtils.button('Zoom Out', function()
		{
			graph.zoomOut();
		}));

		// Fades-out the splash screen after the UI has been loaded.
		stopLoadingScreen();

		//Initialize with default graph
		// initLoad(null);
	}
};

function addToolbarButton(editor, toolbar, action, label, image)
{
	var button = document.createElement('button');
	button.style.fontSize = '10';
	if (image != null)
	{
		var img = document.createElement('img');
		img.setAttribute('src', image);
		img.style.width = '16px';
		img.style.height = '16px';
		img.style.verticalAlign = 'middle';
		img.style.marginRight = '2px';
		button.appendChild(img);
	}
	mxEvent.addListener(button, 'click', function(evt)
	{
		editor.execute(action);
	});
	//Creates a text node for the given string and appends it to the given parent.
	mxUtils.write(button, label);
	toolbar.appendChild(button);
};

function showModalWindow(graph, title, content, width, height)
{
	var background = document.createElement('div');
	background.style.position = 'absolute';
	background.style.left = '0px';
	background.style.top = '0px';
	background.style.right = '0px';
	background.style.bottom = '0px';
	background.style.background = 'black';
	mxUtils.setOpacity(background, 50);
	document.body.appendChild(background);

	if (mxClient.IS_IE)
	{
		new mxDivResizer(background);
	}

	var x = Math.max(0, document.body.scrollWidth/2-width/2);
	var y = Math.max(10, (document.body.scrollHeight ||
				document.documentElement.scrollHeight)/2-height*2/3);
	var wnd = new mxWindow(title, content, x, y, width, height, false, true);
	wnd.setClosable(true);

	// Fades the background out after after the window has been closed
	wnd.addListener(mxEvent.DESTROY, function(evt)
	{
		graph.setEnabled(true);
		mxEffects.fadeOut(background, 50, true,
			10, 30, true);
	});
	wnd.setVisible(true);
	return wnd;
};

function addSidebarIcon(graph, sidebar, prototype, image)
{
	// Function that is executed when the image is dropped on
	// the graph. The cell argument points to the cell under
	// the mousepointer if there is one.

	var funct = function(graph, evt, cell, x, y)
	{
		var pt = graph.getPointForEvent(evt);
		var parent = graph.getDefaultParent();
		var model = graph.getModel();
		var v1 = model.cloneCell(prototype);

		model.beginUpdate();
		try
		{
			// NOTE: For non-HTML labels the image must be displayed via the style
			// rather than the label markup, so use 'image=' + image for the style.
			// as follows: v1 = graph.insertVertex(parent, null, label,
			// pt.x, pt.y, 120, 120, 'image=' + image);
			//v1 = graph.insertVertex(parent, null, prototype, x, y, 100, 100);
			//v1.setConnectable(true);
			v1.geometry.x = pt.x;
			v1.geometry.y = pt.y;
			// var validName = v1.value.name;
			// var validName = getValidName(v1.value.name);
			// v1.value.name = validName;
			// v1.value.label = '<img src="images/icons48/'+v1.value.type.toLowerCase()+'.png" width="48" height="48">'+
			// 	 '<h1 style="margin:0px;">'+validName+'</h1>';
			// console.log(v1);
			graph.addCell(v1, parent);
		}
		finally
		{
			model.endUpdate();
		}

		graph.setSelectionCell(v1);
	}

	// Creates the image which is used as the sidebar icon (drag source)
	var img = document.createElement('img');
	img.setAttribute('src', image);
	img.style.width = '48px';
	img.style.height = '48px';
	img.title = 'Drag this to the diagram to create a new vertex';
	sidebar.appendChild(img);

	// Creates the image which is used as the drag icon (preview)
	var dragImage = img.cloneNode(true);
	var ds = mxUtils.makeDraggable(img, graph, funct, dragImage);
	ds.setGuidesEnabled(true);
};

function configureStylesheet(graph)
{
	var style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
	style[mxConstants.STYLE_FILLCOLOR] = '#8CCDF5';
	style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_ROUNDED] = true;
	style[mxConstants.STYLE_OPACITY] = '80';
	style[mxConstants.STYLE_FONTSIZE] = '12';
	style[mxConstants.STYLE_FONTSTYLE] = 0;
	style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
	graph.getStylesheet().putDefaultVertexStyle(style);

	style = graph.getStylesheet().getDefaultEdgeStyle();
	style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_STROKEWIDTH] = '2';
	style[mxConstants.STYLE_ROUNDED] = true;
};

function showProperties(graph, cell){
	// Creates a form for the user object inside
	// the cell
	var form = new mxForm('configure');
	var edgeFields = [];

	if(cell.isVertex()){
		// Adds a field for the columnname
		//var id = form.addText('id', cell.id);
		var nameField = form.addText('Name', cell.value.name);
		var typeField = form.addText('Type', cell.value.type);
		var interfaceField = form.addText('interface',cell.value.interface);

		// Show interfaces and their edge terminals
		var edgeCount = cell.getEdgeCount();

		for (var i = 0; i < edgeCount; i++) {
			var edge = cell.getEdgeAt(i);
			var terminal = edge.getTerminal();
			var source = edge.getTerminal(true);
			if(terminal != null && terminal.id != cell.id)
			{
				if(cell.value.type == 'Client')
					edgeFields.push(
					{
						interfaceId:form.addText("InterfaceId to "+terminal.value.name, "eth0"),
						ip:form.addText("IP address to "+terminal.value.name, "192.168.0.1"),
						netmask:form.addText("Netmask to "+terminal.value.name, "255.255.255.0"),
						gateway:form.addText("Gateway to "+terminal.value.name, "192.168.1.1")
					});
				else if (cell.value.type == 'Switch')
				{
					edgeFields.push(
					{
						vlan:form.addText("VLAN to "+terminal.value.name, "VLAN"+i)
					});
				}
			}
		};

		var wnd = null;
		// Defines the function to be executed when the
		// OK button is pressed in the dialog
		var okFunction = function()
		{
			var clone = mxUtils.clone(cell.value);

			CELLS.remove(CELLS.indexOf(cell.value.name));
			clone.name = getValidName(nameField.value);
			CELLS.push(clone.name);
			console.log(CELLS);

			clone.type = typeField.value;
			// clone.ip = ipField.value;
			clone.interface = interfaceField.value;
			  //clone.id = id.value;
			clone.label = '<img src="images/icons48/'+clone.type.toLowerCase()+'.png" width="48" height="48"><br>'+
							 '<h1 style="margin:0px;">'+clone.name+'</h1>';
			clone.edgeFields = [];

			function Interface(interfaceId, ip, netmask, gateway){
				this.interfaceId = interfaceId;
				this.ip = ip;
				this.netmask = netmask;
				this.gateway = gateway;
			};

			for (var i = 0; i < edgeFields.length; i++) {
				// console.log(new Interface(edgeFields[i].interfaceId.value,
				// 					edgeFields[i].ip.value,
				// 					edgeFields[i].netmask.value,
				// 					edgeFields[i].gateway.value));
				var tmp = new Interface(edgeFields[i].interfaceId.value,
									edgeFields[i].ip.value,
									edgeFields[i].netmask.value,
									edgeFields[i].gateway.value);
				clone.edgeFields.push(tmp);
			};

			graph.model.beginUpdate();
			graph.model.setValue(cell, clone);
			graph.model.endUpdate();
			// debugPrintCells(graph);
			wnd.destroy();}
		var cancelFunction = function()
		{
			wnd.destroy();
		}
		form.addButtons(okFunction, cancelFunction);
		var name = cell.value.name;
	}
	else if(cell.isEdge())
	{
		var sourceName = form.addText('SourceName', cell.getTerminal(true).value.name);
		var sourceInterface = form.addText('SourceInterface', cell.getTerminal(true).value.interface);
		var targetName = form.addText('TargetName', cell.getTerminal().value.name);
		var targetInterface = form.addText('TargetInterface', cell.getTerminal().value.interface);
	}
	wnd = showModalWindow(graph,name,form.table, 300, 200+80*edgeFields.length);
};

//check whether all icons are connected
function isIconConnected(graph)
{
	var i = 2;
	//var isCell = true;
	var cell = new mxCell();
	while(true)
	{
		cell = graph.getModel().getCell(i);
		if(cell==null)
		{
			break;
		}else if(graph.getModel().isVertex(cell))
		{
			if(cell.getEdgeCount()==0)
			{
				return false;
			}
		}
		i++;
	}
	return true;
}

//Console debugging: print all cells
function debugPrintCells(graph)
{
	console.log("\n=====================================================\n"
				 +"======================DEBUGGING======================\n"
				 +"=====================================================");
	//var isCell = true;

	var root = graph.getModel().getCell(1);
	var cell = new mxCell();

	for (var i = 0; i < root.getChildCount(); i++) {
		cell = root.getChildAt(i);

		console.log("===DEBUG=== Cell: "+cell.id);
		console.log(cell);
		console.log("Edge count: "+graph.getModel().getEdgeCount(cell));
		if(cell.value != null)
			console.log("Type: "+ cell.value.type);

	};
}

function isSwitchConnected(graph)
{
	if(graph.getModel().getCell(5)!=null)
	{
		var i =2;
		var cell = new mxCell();
		while(true)
		{
			cell = graph.getModel().getCell(i);
			if(cell==null)
			{
				break;
			}else
			{
				if(cell.isEdge())
				{
					if(cell.getTerminal().value.type!='Switch')
					{
						return false;
					}
				}
			}
			i++;
		}
		return true;
	}else
	{
		return true;
	}
}

function initLoad(xml)
{
	startLoadingScreen();
	CELLS = [];		//reset cells array
	if(typeof(GLOBAL_GRAPH) != 'undefined')
	{
		GLOBAL_GRAPH.getModel().beginUpdate();
		if(xml == null)
			var doc = mxUtils.parseXml(getGraph('<?php echo $_GET["lab_id"]; ?>'));
		else
			var doc = mxUtils.parseXml(xml);
		var dec = new mxCodec(doc);
		dec.decode(doc.documentElement, GLOBAL_GRAPH.getModel());
		GLOBAL_GRAPH.getModel().endUpdate();

		//debugging calls
		debugPrintCells(GLOBAL_GRAPH);
	}
	stopLoadingScreen();
};