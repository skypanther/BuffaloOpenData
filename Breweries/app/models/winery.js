exports.definition = {
	config: {
		columns: {
			title: "text",
			address: "text",
			city: "text",
			state: "text",
			zip: "text",
			latitude: "real",
			longitude: "real",
			type: "text"
		},
		adapter: {
			type: "sql",
			collection_name: "winery"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};