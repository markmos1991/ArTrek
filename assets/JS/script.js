// store API Keys as variables
  // EU Key
var EUAPIKey =  "tatityas";
  // GG Key
var GGAPIKey = "AIzaSyADX0Zd0LOToDJv9h85TLZXc8GUliRPzTU";
var EUQuery = ""

// create a function to search EU API when keyword is entered into search bar
  // select specific data from the 12 returned objects
  // store results for each item together in a new object for each item
    // Select Title *
    // Select thumbnail image *
    // Select description *
    // Select large image
    // Select any associated audio clips
    // select location
      // Latitude
      // Longitude

  // display * info of new simplified item objects in small cards on main page

  // on clicking on card, display a modal which shows the more detailed info of the whole object
    //Display a map with marker in this modal
      // use the objects lat and long data as input for the Maps API to display Marker
  

var queryURL = "https://api.europeana.eu/record/v2/search.json?wskey=" + APIKey + "&query=" + EUQuery;
// log the data available on input of a city name
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });