// Teleport API

$('#search').autocomplete({
	serviceUrl: 'https://api.teleport.org/api/cities/',
	paramName: 'search',
	transformResult: function (data) {
		var json =JSON.parse(data);
		var city = json._embedded["city:search-results"];
		// console.log(city[0]._links);
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
			console.log(response._links["city:urban_area"].href);

		});

	}
	
});


$.ajax({ url: 'https://api.teleport.org/api/urban_areas/slug:austin/scores/', method: 'GET'}).done(function(response) {
			console.log(response.categories);

		});
// $('#search').keydown(function(e) {
// 	if(e.keyCode === 13) {

// 		if($('#search').val() !== '') {
// 			pr();
// 		}

// 		else{
// 			alert("Please Enter A City");
// 		}
// 	}

// });


// new TeleportAutocomplete({ el: '#search', maxItems: 5 });
// TeleportAutocomplete.init('#search').on('change', function(value) { console.log(value); });


// function pr() {
// 	var city = $('#search').val().trim();
// 	console.log(city);

// }
