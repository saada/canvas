var scripts = ['commands.js', 'Switch.js', 'Server.js', 
			'Router.js', 'Internet.js','Client.js'];
for(var i = 0; i < scripts.length; i++) {
    jQuery.getScript('js/'+scripts[i], function() {
    	if(i == scripts.length - 1)
		{
			jQuery(top.document).ready(function(){
				loadGraphs(); // load graph list from database

				//load graph to default dropdown selection, it needs 1ms before finding the dropdown object
				setTimeout(function(){
					if(jQuery('#graphList',top.document).length == 0) //If it doesn't exist
					{
						alert("Error!");
					}
					else
					{
						initLoad(getGraphById(jQuery('#graphList',top.document).val()));	//init graph current selection from dropdown
					}
				}
				,500);


				jQuery('#graphList',top.document).change(function() {
					loadGraph();
				});

				jQuery('#loadBtn',top.document).click(function() {
					loadGraph();
				});

				jQuery('#clearBtn', top.document).click(function(){
					clearGraph();
				});

				jQuery('#deleteBtn', top.document).click(function(){
					if(confirm("Delete graph?"))
						deleteGraph();
				});
			});
    	}    	//script loaded
    });
}