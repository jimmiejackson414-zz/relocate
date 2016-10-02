// Teleport API

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

    	var obj = {};
    	var queryUrl = suggestions.link;
    	var salariesHref;

    	var masterPromise = $.ajax({ url: queryUrl, method: 'GET' })

    	masterPromise.then(function (masterResponse) {
    		return $.ajax({ url: masterResponse._links["city:urban_area"].href, method: 'GET' })
    	}).then(function (uaResponse) {
    		console.log(uaResponse)
    		obj.name = uaResponse.full_name;
        	$('#currentCity').html(obj.name);
    		var scoresPromise = $.ajax({url: uaResponse._links["ua:scores"].href, method: 'GET' }).then(function (scoreResponse){
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
    			$('#cityScore').html(obj.cityScore)
    			$('#costOfLivingDet').css({"width":obj.costLiving});
    			$('#housingDet').css({"width":obj.housing});
    			$('#massTransitDet').css({"width":obj.massTransit});
    			$('#commuteDet').css({"width":obj.commute});
    			$('#safetyDet').css({"width":obj.safety});
    			$('#educationDet').css({"width":obj.education});
    			$('#internetDet').css({"width":obj.internet});
    			$('#leisureDet').css({"width":obj.leisure});
    			$('#toleranceDet').css({"width":obj.tolerance});
        		$('#outdoorDet').css({"width":obj.outdoor});
    		})
    		var detailsPromise = $.ajax({url: uaResponse._links["ua:details"].href, method: 'GET' }).then(function (detailsResponse){
    			obj.jobsal = detailsResponse.salaries;
    			console.log(obj.jobsal);
    		})


    	})   
           
    }

});

$('#search-form').on('submit', function(e){
	e.preventDefault();
})


