var http = require('http'),
    https = require('https'),
    args = process.argv,
    breweryDbApiKey = require('./controllers/apikey.js').breweryDbApiKey;

var api_url = ('http://api.brewerydb.com/v2/search?q=XXX&type=brewery&key='+breweryDbApiKey).replace('XXX', args[2]);
var myreq = http.get(encodeURI(api_url), function(r) {
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
            o.breweryName = d.data[0].name;
            o.description = d.data[0].description;
            o.established = d.data[0].established;
            o.website = d.data[0].website;
            o.logo = d.data[0].images.large;
            results.push(o);
        }
        response = {"breweries":results};
        console.log(JSON.stringify(response));
  });
});
