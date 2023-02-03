var searchFormEl = $('#search-form');
// store API Keys as variables
  // EU Key
var EUAPIKey =  "tatityas";
  // GG Key
var GGAPIKey = "AIzaSyADX0Zd0LOToDJv9h85TLZXc8GUliRPzTU";


   // create a function to search EU API when keyword is entered into search bar
function searchEuropeana(event) {
  event.preventDefault();

  var EUQuery = $("#userInput").val(); 
  console.log(EUQuery);
  var queryURL = "https://api.europeana.eu/record/v2/search.json?wskey=" + EUAPIKey + "&query=" + EUQuery;
  
  // initialise item data object to store response data 
  var itemData = {};
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // select specific data from the 12 returned objects
      // var responseData = response.data;
      // responseData.forEach(function(artefactData) {
      //   console.log(artefactData);
      // })
      // Extract the item data from the API response
      var items = response.items;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        // Store the specific aspect of the item data in the object
        itemData[i] = {
          title: Array.isArray(item.title) ? item.title[0] : item.title,
          description: Array.isArray(item.description) ? item.description[0] : item.description,
          image: Array.isArray(item.edmPreview) ? item.edmPreview[0] : item.edmPreview,
          latitude: Array.isArray(item.edmPlaceLatitude) ? item.edmPlaceLatitude[0] : item.edmPlaceLatitude,
          longitude: Array.isArray(item.edmPlaceLongitude) ? item.edmPlaceLongitude[0] : item.edmPlaceLongitude
        };
      }
      // console.log(response)
      console.log(itemData[0]);
  // store results for each item together in a new object for each item
  
    // Select Title *
    // Select thumbnail image *
    // Select description *
    // Select large image
    // Select any associated audio clips
    // select location
      // Latitude
      // Longitude
      console.log(response);
    });
}

searchFormEl.on('submit', searchEuropeana);

 // display * info of new simplified item objects in small cards on main page

  // on clicking on card, display a modal which shows the more detailed info of the whole object
    //Display a map with marker in this modal
      // use the objects lat and long data as input for the Maps API to display Marker