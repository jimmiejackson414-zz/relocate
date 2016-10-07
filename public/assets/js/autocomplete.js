// Teleport API
var obj = {};

$('#search').autocomplete({
    serviceUrl: 'https://api.teleport.org/api/cities/',
    paramName: 'search',
    transformResult: function(data) {
        var json = JSON.parse(data);
        var city = json._embedded["city:search-results"];
        // console.log(city[0]._links);
           
        var suggestions = [];
        var maxResults = 5;
        city = city.slice(0, 5);
        city.forEach(function (city, index) {
        	suggestions.push(
        		{
                value: city.matching_full_name,
                data: city,
                link: city._links["city:item"].href
            	}
        	);
        });

        return { suggestions: suggestions };
    },
    
    onSelect: function(suggestions) {

    	var queryUrl = suggestions.link;
    	var salariesHref;

    	var masterPromise = $.ajax({ url: queryUrl, method: 'GET' })

    	masterPromise.then(function (masterResponse) {
    		return $.ajax({ url: masterResponse._links["city:urban_area"].href, method: 'GET' })
    	}).then(function (uaResponse) {
    		console.log(queryUrl);
    		obj.city = uaResponse._links["ua:identifying-city"].name;
    		obj.state = uaResponse._links["ua:admin1-divisions"][0].name;
    
    		///////// WEATHER UNDERGROUND /////////

			// This is our API Key - https://home.openweathermap.org/api_keys
			var APIKey = "d4bcc2842a7e6378";

			var weatherURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/conditions/q/" + obj.state + "/" + obj.city + ".json";
			// console.log(weatherURL)
			// AJAX call for weather
			$.ajax({ url: weatherURL, method: 'GET' }).done(function(res){
				obj.temp = Math.round(res.current_observation.temp_f) + '&deg';
				$("#currentWeatherInfo").html(obj.temp);
			})

    //ADDS NAME TO THE TOP OF THE PAGE
    		
            obj.name = uaResponse.full_name;
        	$('#currentCity').html(obj.name);
    			var scoresPromise = $.ajax({url: uaResponse._links["ua:scores"].href, method: 'GET' }).then(function (scoreResponse){
   
   //PUSHING SCORES INTO AN OBJECT AND ADDING THEM TO THE SCORES CARD.	
    			obj.summary = scoreResponse.summary;
    			obj.cityScore = Math.round(scoreResponse.teleport_city_score)+"%";
    			obj.costLiving = Math.round(scoreResponse.categories[1].score_out_of_10 * 10) + "%";
    			obj.housing = Math.round(scoreResponse.categories[0].score_out_of_10 * 10) + "%";
    			obj.massTransit = Math.round(scoreResponse.categories[4].score_out_of_10 * 10) + "%";
    			obj.commute = Math.round(scoreResponse.categories[5].score_out_of_10 * 10) + "%";
    			obj.safety = Math.round(scoreResponse.categories[7].score_out_of_10 * 10) + "%";
    			obj.education = Math.round(scoreResponse.categories[9].score_out_of_10 * 10) + "%";
    			obj.internet = Math.round(scoreResponse.categories[13].score_out_of_10 * 10) + "%";
    			obj.leisure = Math.round(scoreResponse.categories[14].score_out_of_10 * 10) + "%";
    			obj.tolerance = Math.round(scoreResponse.categories[15].score_out_of_10 * 10) + "%";
    			obj.outdoor= Math.round(scoreResponse.categories[16].score_out_of_10 * 10) + "%";
    			// console.log(obj.cityScore);
    			$('#citySummary').html(obj.summary);
    			$('#cityScoreDet').css({"width":obj.cityScore});
    			$('#cityScore').html(obj.cityScore);
    			$('#costOfLivingDet').css({"width":obj.costLiving});
    			$('#costOfLiving').html(obj.costLiving);
    			$('#housingDet').css({"width":obj.housing});
    			$('#housing').html(obj.housing);
    			$('#massTransitDet').css({"width":obj.massTransit});
    			$('#massTransit').html(obj.massTransit);
    			$('#commuteDet').css({"width":obj.commute});
    			$('#commute').html(obj.commute);
    			$('#safetyDet').css({"width":obj.safety});
    			$('#safety').html(obj.safety);
    			$('#educationDet').css({"width":obj.education});
    			$('#education').html(obj.education);
    			$('#internetDet').css({"width":obj.internet});
    			$('#internetAccess').html(obj.internet);
    			$('#leisureDet').css({"width":obj.leisure});
    			$('#leisureAndCulture').html(obj.leisure);
    			$('#toleranceDet').css({"width":obj.tolerance});
    			$('#tolerance').html(obj.tolerance);
        		$('#outdoorDet').css({"width":obj.outdoor});
        		$('#outdoors').html(obj.outdoor);

        		
    		})
    		var imagesPromise = $.ajax({url: uaResponse._links["ua:images"].href, method: 'GET' }).then(function (imagesResponse){
    			var image = imagesResponse.photos[0].image.mobile;
                $('#picture').html('<img src="' + image + '"  style="width:300px; height:300px;">')
    		})
            var detailsPromise = $.ajax({url: uaResponse._links["ua:details"].href, method: 'GET' }).then(function (detailsResponse){
                console.log(detailsResponse.categories[3].data[1].currency_dollar_value);
            })

    	}) 
           
    }

});

$('#search-form').on('submit', function(e){
	e.preventDefault();
})

$("#jobButton").on('click', function(){

        var job = $("#jobSearch").val();
        var jobSearch = job.replace(' ','+');
        var indeed = 'http://www.indeed.com/jobs?q=' + jobSearch + '&l=' + obj.city + '%2C' + obj.state;
        // console.log(indeed);
        var win = window.open(indeed, '_blank');

        return false

    })  

// $('#search-form').on('click',function(){
// 	$('#search').empty();
// })

 



