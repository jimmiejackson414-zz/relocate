// Teleport API

$('#search').autocomplete({
	serviceUrl: 'https://api.teleport.org/api/cities/',
	paramName: 'search',
	transformResult: function (data) {
		console.log(data);
		// parse data object and form into suggestions array
		return {
			suggestions: [
				{
					value: 'someString',
					data: 'someStuff'
				},
				{
					matching_full_name: 'someString2',
					href: 'someStuff2'
				}
			]
		}
	},
	onSelect: function (selection) {
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
