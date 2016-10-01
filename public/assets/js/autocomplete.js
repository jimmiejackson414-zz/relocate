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
        		$('#citySummary').html(obj.summary);
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


