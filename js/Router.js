// Defines the Router object
function Router(name)
{
	this.name = name;
	if(typeof(name) != 'undefined')
		this.label = '<img src="images/icons48/router.png" width="48" height="48">'+
					'<h1 style="margin:0px;">'+name+'</h1>';
}

Router.prototype.type = null;

Router.prototype.ip = null;

Router.prototype.interface = null;

Router.prototype.label = '<img src="images/icons48/router.png" width="48" height="48">'+
						'<h1 style="margin:0px;">Router</h1>';
Router.prototype.clone = function()
{
	return mxUtils.clone(this);
};