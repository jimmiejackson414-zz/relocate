// Teleport API

$('#search').autocomplete({
	serviceUrl: 'https://api.teleport.org/api/cities/',
	paramName: 'search',
	transformResult: function (data) {
		var json =JSON.parse(data);
		var city = json._embedded["city:search-results"];
		console.log(city[0]._links);
		return {
			// city.forEach(function (city, index) {
			// });
			suggestions: [
					{
						value: city[0].matching_full_name,
						data: city[0],
						link: city[0]._links["city:item"].href
					},
					{
						value: city[1].matching_full_name,
						data: city[1],
						link: city[1]._links["city:item"].href
					},
					{
						value: city[2].matching_full_name,
						data: city[2],
						link: city[2]._links["city:item"].href
					},
					{
						value: city[3].matching_full_name,
						data: city[3],
						link: city[3]._links["city:item"].href
					},
					{
						value: city[4].matching_full_name,
						data: city[4],
						link: city[4]._links["city:item"].href
					}
					
				]
			
		}
	},
	onSelect: function (suggestions) {
		// console.log(suggestions.data);
		// console.log('You selected ' + suggestions.value + ' its metadata is ' + suggestions.link);

		var queryURL = suggestions.link;
		
		$.ajax({ url: queryURL, method: 'GET'}).done(function(response) {
			// THIS WILL PULL A LINK WHERE WE WILL HAVE TO MAKE AN ADDITIONAL AJAX CALL.
			$('#currentCity').html(suggestions.value);
			console.log(response._links["city:urban_area"].href);

		});

	}
});


	//ASK ROB ON HOW WE CAN START GOING THROUGH EACH LINK DEPENDING ON CITY.

		$.ajax({ url: 'https://api.teleport.org/api/urban_areas/slug:austin/', method: 'GET'}).done(function(response) {
				
				//THIS WILL PULL THE CITY NAME AND PLACE IT ABOVE THE PAGE.
				// console.log(response.full_name);
				// $('#currentCity').html(response.full_name);

		});

		$.ajax({ url: 'https://api.teleport.org/api/urban_areas/slug:austin/details/', method: 'GET'}).done(function(response) {
				console.log(response.categories[2].data)
				// THIS WILL PULL AVERAGA HIGH IN CITY
				// console.log(response.categories[2].data[4].string_value);
				

		});
		
