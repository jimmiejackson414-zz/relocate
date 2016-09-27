// Teleport API

$('#search').autocomplete({
	serviceUrl: 'https://api.teleport.org/api/cities/',
	paramName: 'search',
	transformResult: function (data) {
		var json =JSON.parse(data);
		var city = json._embedded["city:search-results"];
		console.log(json);
		console.log(city[0]);
		return {
			// city.forEach(function (city, index) {
				// console.log(city);
			// });
			suggestions: [
					{
						value: city[0].matching_full_name,
						data: city[0]
					},
					{
						value: city[1].matching_full_name,
						data: city[1]
					},
					{
						value: city[2].matching_full_name,
						data: city[2]
					},
					{
						value: city[3].matching_full_name,
						data: city[3]
					},
					{
						value: city[4].matching_full_name,
						data: city[4]
					}
					
				]
			
		}
	},
	onKeyPress: function (selection) {
		console.log(selection.value);
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
