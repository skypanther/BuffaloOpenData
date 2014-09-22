var TIMEOUT = 20000;
exports.getData = function(type, callback) {
	if(!type || !type.match(/[breweries|cideries|wineries|distilleries]/)) {
		throw "Error: no type specified"
	}
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		var response = JSON.parse(this.responseText);
		callback(response[type]);
	};
	xhr.onerror = function(e) {
		callback(false, e);
	};
	urlToLoad = Alloy.CFG.nodeacs + '/' + type;
	console.log(urlToLoad)
	xhr.open('GET', urlToLoad);
	xhr.setTimeout(TIMEOUT);
	xhr.send();
}