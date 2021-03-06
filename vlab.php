<!DOCTYPE html>
<html>
	<head>
		<style type="text/css">
			html, body {
				width: 100%;
				height: 100%;
				margin: 0;
			}
		</style>
		<link rel="stylesheet" href="js/vendors/dojo-1.8.3/dijit/themes/soria/soria.css" />
		<!-- <link rel="stylesheet" href="css/bootstrap.min.css"> -->
		<script>
		    // Instead of using data-dojo-config, we’re creating a dojoConfig
		    // object *before* we load dojo.js; they’re functionally identical,
		    // it's just easier to read this approach with a larger configuration.
		    var dojoConfig = {
		        async: true,
		        parseOnLoad: true,
		        // This code registers the correct location of the "demo"
		        // package so we can load Dojo from the CDN whilst still
		        // being able to load local modules
		        packages: [
		        	// {name: "vendors", location: "../../"}
	            ]
		    };
		</script>

	</head>
	<body class="soria">
		<div id="graphWidget" class=""></div>

		<!-- Include dojo -->
		<script src="js/vendors/dojo-1.8.3/dojo/dojo.js"></script>
		<script>
       		require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane"]);
       	</script>

		<div data-dojo-type="dijit/layout/BorderContainer" style="width: 100%; height: 100%">
			<div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter:true,region:'top'">User Info</div>
			<div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter:true,region:'leading'">Classes/Labs</div>
			<div data-dojo-type="dijit/layout/TabContainer" data-dojo-props="splitter:true,region:'center'">
				<div data-dojo-type="dijit/layout/ContentPane" title="Lab 1">
					<iframe src="graph.html" style="width: 100%; height: 100%" frameborder="0"></iframe>
				</div>
				<div data-dojo-type="dijit/layout/ContentPane" title="Lab 2">
					<iframe src="graph.html" style="width: 100%; height: 100%" frameborder="0"></iframe>
				</div>
				<div data-dojo-type="dijit/layout/ContentPane" title="Lab 3">
					<iframe src="graph.html" style="width: 100%; height: 100%" frameborder="0"></iframe>
				</div>

			</div>
			<!-- <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter:true,region:'bottom'">Bottom pane</div> -->
		</div>

	</body>
</html>