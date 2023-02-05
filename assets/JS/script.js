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
      // Extract the item data from the API response
      var items = response.items;
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
          longitude: Array.isArray(item.edmPlaceLongitude) ? item.edmPlaceLongitude[0] : item.edmPlaceLongitude
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
      <div class="resultsColumn">
        <div class="cardContainer card w-100 mt-2 col-sm-12 col-md-6 col-lg-3">
          <img src="${item.image}" class="resultImages" id="carouselExampleControls${i}" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${item.image}" class="d-block w-100" alt="${item.title}">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls${i}" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls${i}" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <a href="#" class="btn btn-lg btn-primary" data-toggle="modal" data-target="#itemModal${i}">More Information</a>
          </div>
        </div>
      </div>
    `
    
    // Append the card HTML to the card container
    $("#searchResults").append(cardHTML);
  }
}

searchFormEl.on('submit', searchEuropeana);