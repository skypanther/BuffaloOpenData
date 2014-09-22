var http = require('http'),
	https = require('https'),
	url = require('url');

function index(req, res) {
	res.render('index', { title: 'Welcome to Node.ACS!' });
}


function getBreweries(req, res) {
	var myreq = https.get("https://data.ny.gov/api/views/c2hv-vmqn/rows.json", function(r) {
	var str="";
	var results=[];
	var response={};
	r.setEncoding('utf8');
	 r.on('data', function (chunk) {
		str += chunk;
	  });
	  r.on('end', function () {
			var d = JSON.parse(str);
			var dlength = d.data.length;
			for(var i=0; i<dlength ;i++){
				if(d.data[i][9] === 'BREWER' || d.data[i][9] === 'FARM BREWER' || d.data[i][9] === 'MICRO BREWER' || d.data[i][9] === 'RESTAURANT BREWER') {
					var o={};
					o.name = toTitleCase(d.data[i][16] || d.data[i][15]);
					o.address = toTitleCase(d.data[i][17]);
					o.city = toTitleCase(d.data[i][19]);
					o.state = d.data[i][20];
					o.zip = d.data[i][21];
					o.latitude = d.data[i][26];
					o.longitude = d.data[i][27];
					o.type = toTitleCase(d.data[i][9]);
					results.push(o);
				}
			}
			response = {
				"length": results.length,
				"breweries":results
			};
			res.write(JSON.stringify(response));
		res.end();
	  });
	});
}

function getCideries(req, res) {
	var myreq = https.get("https://data.ny.gov/api/views/c2hv-vmqn/rows.json", function(r) {
	var str="";
	var results=[];
	var response={};
	r.setEncoding('utf8');
	 r.on('data', function (chunk) {
		str += chunk;
	  });
	  r.on('end', function () {
			var d = JSON.parse(str);
			var dlength = d.data.length;
			for(var i=0; i<dlength ;i++){
				if(d.data[i][9] === 'CIDER PRODUCER') {
					var o={};
					o.name = toTitleCase(d.data[i][16] || d.data[i][15]);
					o.address = toTitleCase(d.data[i][17]);
					o.city = toTitleCase(d.data[i][19]);
					o.state = d.data[i][20];
					o.zip = d.data[i][21];
					o.latitude = d.data[i][26];
					o.longitude = d.data[i][27];
					o.type = toTitleCase(d.data[i][9]);
					results.push(o);
				}
			}
			response = {
				"length": results.length,
				"cideries":results
			};
			res.write(JSON.stringify(response));
		res.end();
	  });
	});
}

function getDistilleries(req, res) {
	var myreq = https.get("https://data.ny.gov/api/views/c2hv-vmqn/rows.json", function(r) {
	var str="";
	var results=[];
	var response={};
	r.setEncoding('utf8');
	 r.on('data', function (chunk) {
		str += chunk;
	  });
	  r.on('end', function () {
			var d = JSON.parse(str);
			var dlength = d.data.length;
			for(var i=0; i<dlength ;i++){
				if(d.data[i][9] === 'DISTILLER "A-1"' || d.data[i][9] === 'DISTILLER "B-1"' || d.data[i][9] === 'DISTILLER "C"' || d.data[i][9] === 'FARM DISTILLER "D"') {
					var o={};
					o.name = toTitleCase(d.data[i][16] || d.data[i][15]);
					o.address = toTitleCase(d.data[i][17]);
					o.city = toTitleCase(d.data[i][19]);
					o.state = d.data[i][20];
					o.zip = d.data[i][21];
					o.latitude = d.data[i][26];
					o.longitude = d.data[i][27];
					o.type = toTitleCase(d.data[i][9]);
					results.push(o);
				}
			}
			response = {
				"length": results.length,
				"distilleries":results
			};
			res.write(JSON.stringify(response));
		res.end();
	  });
	});
}

function getWineries(req, res) {
	var myreq = https.get("https://data.ny.gov/api/views/c2hv-vmqn/rows.json", function(r) {
	var str="";
	var results=[];
	var response={};
	r.setEncoding('utf8');
	 r.on('data', function (chunk) {
		str += chunk;
	  });
	  r.on('end', function () {
			var d = JSON.parse(str);
			var dlength = d.data.length;
			for(var i=0; i<dlength ;i++){
				if(d.data[i][9] === 'FARM WINERY' || d.data[i][9] === 'WINERY' || d.data[i][9] === 'WINERY / FARM WINERY RETAIL') {
					var o={};
					o.name = toTitleCase(d.data[i][16] || d.data[i][15]);
					o.address = toTitleCase(d.data[i][17]);
					o.city = toTitleCase(d.data[i][19]);
					o.state = d.data[i][20];
					o.zip = d.data[i][21];
					o.latitude = d.data[i][26];
					o.longitude = d.data[i][27];
					o.type = toTitleCase(d.data[i][9]);
					results.push(o);
				}
			}
			response = {
				"length": results.length,
				"wineries":results
			};
			res.write(JSON.stringify(response));
		res.end();
	  });
	});
}

function brewery(req, res) {
	var url_parts = url.parse(req.url, true);
	var apikey = require('./apikey').breweryDbApiKey;
	var api_url = ('http://api.brewerydb.com/v2/search?q=XXX&type=brewery&key=' + apikey).replace('XXX', url_parts.query.name);
	var myreq = http.get(api_url, function(r) {
		var str="";
		var results=[];
		var response={};
		r.setEncoding('utf8');
		r.on('data', function (chunk) {
			str += chunk;
		});
		r.on('end', function () {
			var d = JSON.parse(str);
			if(d.data && d.data.length > 0) {
				var o={};
				o.name = d.data[0].name;
				o.description = d.data[0].description;
				o.established = d.data[0].established;
				o.website = d.data[0].website;
				o.logo = d.data[0].images.large;
				results.push(o);
			}
			response = {"brewery":results};
			res.write(JSON.stringify(response));
			res.end();
		});
	});
}



/* helper function */
function toTitleCase(str) {
	if(!str) {return '';}
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}