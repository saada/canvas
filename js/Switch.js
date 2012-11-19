// Defines the Switch object
function Switch(name)
{	
	var validName = validSwitch(name);
	this.name = validName;
	SWITCHES.push(validName);
	console.log(validName);
	console.log(SWITCHES);
	this.label = '<img src="images/icons48/switch.png" width="48" height="48">'+
					 '<h1 style="margin:0px;">'+validName+'</h1>';
}

Switch.prototype.type = null;

Switch.prototype.ip = null;

Switch.prototype.interface = null;

Switch.prototype.label = '<img src="images/icons48/switch.png" width="48" height="48">'+
						 '<h1 style="margin:0px;">Switch</h1>';
Switch.prototype.clone = function()
{
	return mxUtils.clone(this);
}