// Defines the Server object
function Server(name)
{
	this.name = name;
	if(typeof(name) != 'undefined')
		this.label = '<img src="images/icons48/server.png" width="48" height="48">'+
						 '<h1 style="margin:0px;">'+name+'</h1>';
}

Server.prototype.type = null;

Server.prototype.ip = null;

Server.prototype.interface = null;

Server.prototype.label = '<img src="images/icons48/server.png" width="48" height="48">'+
						 '<h1 style="margin:0px;">Server</h1>';
Server.prototype.clone = function()
{
	return mxUtils.clone(this);
}