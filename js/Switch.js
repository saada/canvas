// Defines the Switch object
function Switch(name)
{
	this.name = name;
	if(typeof(name) != 'undefined')
		this.label = '<img src="images/icons48/switch.png" width="48" height="48">'+
					'<h1 style="margin:0px;">'+name+'</h1>';
}

Switch.prototype.type = null;

Switch.prototype.ip = null;

Switch.prototype.interface = null;

Switch.prototype.label = '<img src="images/icons48/switch.png" width="48" height="48">'+
						'<h1 style="margin:0px;">Switch</h1>';
Switch.prototype.clone = function()
{
	return mxUtils.clone(this);
};