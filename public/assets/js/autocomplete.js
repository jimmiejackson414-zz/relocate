// Teleport API





$('#search').keydown(function(e) {
	if(e.keyCode === 13) {

		if($('#search').val() !== '') {
			pr();
		}

		else{
			alert("Please Enter A City");
		}
	}

});

function pr() {
	var city = $('#search').val().trim();
	console.log(city);


	var queryURL = 'https://api.teleport.org/api/cities/?search=' + city;
	
	$.ajax({ url: queryURL, method: 'GET'}).done(function(response) {
		console.log(response);
		console.log("We are inside api function City:" + city);	

	});
}
