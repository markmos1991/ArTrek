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
      // Extract the item data from the API response
      // variable of results to be filtered
      console.log(response);
      var items = response.items;
    
      // select specific data from the returned objects
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        // Store the specific aspect of the item data in the object
        itemData[i] = {
          // Select Title *
          title: Array.isArray(item.title) ? item.title[0] : item.title,
          // Select description *
          description: Array.isArray(item.description) ? item.description[0] : item.description,
          // Select thumbnail image *
          image: Array.isArray(item.edmPreview) ? item.edmPreview[0] : item.edmPreview,
          // select location
          // Latitude
          latitude: Array.isArray(item.edmPlaceLatitude) ? item.edmPlaceLatitude[0] : item.edmPlaceLatitude,
          // Longitude
          longitude: Array.isArray(item.edmPlaceLongitude) ? item.edmPlaceLongitude[0] : item.edmPlaceLongitude,
          // select provider
          provider: Array.isArray(item.dataProvider)? item.dataProvider[0] : item.dataProvider,
        };
      }
      console.log(itemData);
      displayCards(itemData);
      
    });
}

function displayCards(itemData) {
  // Clear the existing cards
  $("#searchResults").empty();
  
  // Loop through the itemData object and create a card for each item
  for (var i in itemData) {
    var item = itemData[i];
    
    // Create the card HTML
    var cardHTML = `
    <div class="container-fluid">
        <div class="card">
          <img src="${item.image}" class="card-image-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.dcDescription}</p>
            <h3>Map</h3>
            <iframe frameborder="0" style="border:0" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS" allowfullscreen></iframe>
        </div>
        <div class="modal-footer bg-dark">
        </div>
        </div>
        </div>gitgit gi
    </div>
    `
    
    
    // Append the card HTML to the card container
    $("#searchResults").append(cardHTML);
  }
}

searchFormEl.on('submit', searchEuropeana);



