// Defines the internet object
function Internet(name)
{
	this.name = name;
	if(typeof(name) != 'undefined')
		this.label = '<img src="images/icons48/internet.png" width="48" height="48">'+
					'<h1 style="margin:0px;">'+name+'</h1>';
}

Internet.prototype.type = null;

Internet.prototype.ip = null;

Internet.prototype.label = '<img src="images/icons48/internet.png" width="48" height="48">'+
							'<h1 style="margin:0px;">Internet</h1>';

Internet.prototype.clone = function()
{
	return mxUtils.clone(this);
};