// Teleport API

$('#search').autocomplete({
	serviceUrl: 'https://api.teleport.org/api/cities/',
	paramName: 'search',
	transformResult: function (data) {
		var json =JSON.parse(data);
		var city = json._embedded["city:search-results"];
		return {
			// city.forEach(function (city, index) {
				// console.log(city);
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
	onKeyPress: function (selection) {
		console.log(selection.link);
		alert('You selected ' + selection.value + ' its metadata is ' + selection.data);
	}
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


// 	var queryURL = 'https://api.teleport.org/api/cities/?search=' + city;
	
// 	$.ajax({ url: queryURL, method: 'GET'}).done(function(response) {
// 		console.log(response);
// 		console.log("We are inside api function City:" + city);	

// 	});
// }
