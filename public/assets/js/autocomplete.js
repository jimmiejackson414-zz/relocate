// Teleport API
var city = [];
console.log(city);
var queryURL = 'https://api.teleport.org/api/cities/?search=' + city;


$('#search').keydown(function(e) {
	if(e.keyCode === 13) {

		if($('#search').val() !== '') {
			pr();
		}
	}
});

function pr() {
	city = [];
	console.log(city);
	var text = $('#search').val().trim();
	console.log(text);
	// text = text.replace(/<(?:.|\n)*?>/gm, '');
	// text = text.replace(/[<>]/gi, '');

	city.push(text);
}


// $.ajax({ url: queryURL, method: 'GET'}).done(function(response) {
// 	console.log(response);
// })