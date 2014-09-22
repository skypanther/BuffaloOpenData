Valid URLs are:
	https://URL/breweries
	https://URL/cideries
	https://URL/wineries
	https://URL/distilleries

Each returns a string that can be JSON.parse()'d to create:

````
{
	length: 0, // number
	breweries: [ // object name: breweries, cideries, wineries, or distilleries
		{
			name: 'name',  // string
			address: 'street address',  // string
			city: 'city',  // string
			state: 'state',  // string
			zip: 'zip code',  // string
			latititude: 'lat',  // number
			longitude: 'long',  // number
			type: 'Brewer' // string:
				// breweries: Brewer, Farm Brewer, Micro Brewer, or Restaurant Brewer
				// cideries: Cider Producer
				// wineries: Farm Winery, Winery, or Winery / Farm Winery Retail
				// distilleries: Distiller "A-1", Distiller "B-1", Distiller "C", or Farm Distiller "D"
		},
		...
	]
};
````



https://URL/brewery?name=Brooklyn%20Brewery returns a string that can be JSON.parse()'d to create:

````
brewery.data = [
	{
		name: 'name',  // string
		description: 'description',  // string
		established: 'year',  // string
		website: 'url',  // string
		logo: 'url' // string
	},
	...
]
````
