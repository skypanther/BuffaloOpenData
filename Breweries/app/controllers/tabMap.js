var args = arguments[0] || {},
	net = require('net'),
	annotations = [],
	actionbar,
	winNames = {
		"brewery": "Breweries",
		"cidery": "Cideries",
		"distillery": "Distilleries",
		"winery": "Wineries"
	};

var breweries = Alloy.createCollection('brewery');
breweries.fetch();

if(!breweries.length) {
	// load spinner
	// grab data
	net.getData('breweries', function(establishments) {
		_.each(establishments, function(ginjoint) {
			Alloy.createModel('brewery', {
				title: ginjoint.name,
				latitude: ginjoint.latitude,
				longitude: ginjoint.longitude,
				address: ginjoint.address,
				city: ginjoint.city,
				state: ginjoint.state,
				zip: ginjoint.zip,
				type: ginjoint.type
			}).save();
		});
		plotEstablishments('brewery');
	});
	net.getData('cideries', function(establishments) {
		_.each(establishments, function(ginjoint) {
			Alloy.createModel('cidery', {
				title: ginjoint.name,
				latitude: ginjoint.latitude,
				longitude: ginjoint.longitude,
				address: ginjoint.address,
				city: ginjoint.city,
				state: ginjoint.state,
				zip: ginjoint.zip,
				type: ginjoint.type
			}).save();
		});
	});
	net.getData('distilleries', function(establishments) {
		_.each(establishments, function(ginjoint) {
			Alloy.createModel('distillery', {
				title: ginjoint.name,
				latitude: ginjoint.latitude,
				longitude: ginjoint.longitude,
				address: ginjoint.address,
				city: ginjoint.city,
				state: ginjoint.state,
				zip: ginjoint.zip,
				type: ginjoint.type
			}).save();
		});
	});
	net.getData('wineries', function(establishments) {
		_.each(establishments, function(ginjoint) {
			Alloy.createModel('winery', {
				title: ginjoint.name,
				latitude: ginjoint.latitude,
				longitude: ginjoint.longitude,
				address: ginjoint.address,
				city: ginjoint.city,
				state: ginjoint.state,
				zip: ginjoint.zip,
				type: ginjoint.type
			}).save();
		});
	});
} else {
	plotEstablishments('brewery');
}


function plotEstablishments(collection) {
	var coll = Alloy.createCollection(collection),
		annotations = [];
	coll.fetch();

	if(OS_ANDROID) {
		$.map.annotations = [];
		coll.each(function(ginjoint) {
			if(ginjoint.get("latitude") && ginjoint.get("longitude")) {
				$.map.addAnnotation(require('ti.map').createAnnotation({
					title: ginjoint.get("title"),
					latitude: ginjoint.get("latitude"),
					longitude: ginjoint.get("longitude"),
					subtitle: ginjoint.get("address") + ', ' + ginjoint.get("city"),
					image: "/mapicons/" + collection + ".png"
				}));
			}
		});
	} else {
		coll.each(function(ginjoint) {
			if(ginjoint.get("latitude") && ginjoint.get("longitude")) {
				annotations.push({
					title: ginjoint.get("title"),
					latitude: ginjoint.get("latitude"),
					longitude: ginjoint.get("longitude"),
					subtitle: ginjoint.get("address") + ', ' + ginjoint.get("city"),
					image: "/mapicons/" + collection + ".png"
				});
			}
		});
		$.map.setAnnotations(annotations);
		$.win.title = winNames[collection];
	}
}

$.win.addEventListener("close", function(){
	$.destroy();
});

$.brewery.addEventListener('click', function() {
	plotEstablishments('brewery');
});
$.distillery.addEventListener('click', function() {
	plotEstablishments('distillery');
});
$.cidery.addEventListener('click', function() {
	plotEstablishments('cidery');
});
$.winery.addEventListener('click', function() {
	plotEstablishments('winery');
});

if(OS_ANDROID) {
	$.win.addEventListener('open', function(e) {
		if(e.activity) {
				actionbar = e.activity.actionBar;
		}
	});
}