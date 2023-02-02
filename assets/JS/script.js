

const APIKey =  "tatityas";

// search term variable that needs to come from searhc bar
var searchTerm = "impressionism";


var queryURL = "https://api.europeana.eu/record/v2/search.json?wskey=" + APIKey + "&query=" + searchTerm;



// return data from the search term
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.items);
  });



