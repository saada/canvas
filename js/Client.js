// Defines the client object
function Client(name)
{
	this.name = name;
	if(typeof(name) != 'undefined')
		this.label = '<img src="images/icons48/client.png" width="48" height="48"><br>'+
					'<h1 style="margin:0px;">'+name+'</h1>';
}

Client.prototype.type = null;

Client.prototype.ip = null;

Client.prototype.label = '<img src="images/icons48/client.png" width="48" height="48"><br>'+
						'<h1 style="margin:0px;">Client</h1>';

Client.prototype.edgeFields = [];

Client.prototype.clone = function()
{
	return mxUtils.clone(this);
};