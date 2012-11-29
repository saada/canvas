<!--
  $Id: ports.html,v 1.78 2012-01-08 10:28:37 gaudenz Exp $
  Copyright (c) 2006-2010, JGraph Ltd

  Ports example for mxGraph. This example demonstrates implementing
  ports as child vertices with relative positions and drag and drop
  as well as the use of images and HTML in cells.
-->
<html>
<head>
	<title>Graph Canvas</title>
	<style type="text/css" media="screen">
		BODY {
			font-family: Arial;
		}
		H1 {
			font-size: 18px;
		}
		H2 {
			font-size: 16px;
		}
	</style>
</head>

<!-- Page passes the container for the graph to the grogram -->
<body>

	<!-- Creates a container for the splash screen -->
	<div id="loadSplash">
		<div id="splash"
		style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:white;z-index:1;opacity:0.8;">
		<center id="splash" style="padding-top:230px;">
			<img src="editors/images/loading.gif">
		</center>
		</div>
	</div>

	<!-- Creates a container for the sidebar -->
	<div id="toolbarContainer"
		style="position:absolute;white-space:nowrap;top:0px;left:0px;max-height:24px;height:36px;right:0px;padding:6px;background-image:url('images/toolbar_bg.gif');">
	</div>

	<!-- Creates a container for the toolboox -->
	<div id="sidebarContainer"
		style="position:absolute;top:36px;left:0px;bottom:0px;max-width:52px;width:56px;padding-top:10px;padding-left:4px;background-image:url('images/sidebar_bg.gif');">
	</div>

	<!-- Creates a container for the graph -->
	<div id="graphContainer"
		style="position:absolute;top:36px;left:60px;bottom:0px;right:0px;background-image:url('editors/images/grid.gif');cursor:default;">
	</div>

</body>
</html>
<!-- Sets the basepath for the library if not in same directory -->
<script type="text/javascript">
	mxBasePath = '../src';
</script>

<!-- Loads and initializes the library -->
<script type="text/javascript" src="../src/js/mxClient.js"></script>

<!-- Include graph javascript -->
<script type="text/javascript" src="js/graph.js"></script>

<!-- include jQuery -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

<!-- Include ajax commands -->
<script src="js/commands.js"></script>

<!-- Include objects -->
<script src="js/Switch.js"></script>
<script src="js/Server.js"></script>
<script src="js/Router.js"></script>
<script src="js/Internet.js"></script>
<script src="js/Client.js"></script>