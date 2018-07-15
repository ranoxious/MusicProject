$(document).ready(function() {
  searchArtists(document.URL.split('?')[1]);
});


var eventNamesList = [];
var eventURLList = [];

function searchArtists(artist) {

  // Querying the Audio Scrobbler api for the selected artist, the ?app_id parameter is required, but can equal anything
  var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=ff8c47bf95be28a671e9ebc3a0e28a58&format=json";

  // querying ticketmaster API for concerts in US from typed in artist
  var queryURL2 = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=" + artist + "&apikey=fRxunqMby1GKWG6AMteLgfjh6PcOIrwM";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Printing the entire object to console
    console.log(response);

    // Constructing HTML containing the artist information
    var artistName = $("<h1>").html(response.artist.name);
    var artistURL = $("<a>").attr("href", response.url).append(response.artist.name);

    var artistImage = $("<img>").attr("src", response.artist.image[0]["#text"]);
    var artistImage2 = $("<img>").attr("src", response.artist.image[2]["#text"]);
    var bio = $("<h6>").html(response.artist.bio.content);
    // var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    // var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    // var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    // Empty the contents of the artist-div, append the new artist content
    $("#artist-div").append(artistName);
    $("#artist-div").append($("<br>"));
    // $("#artist-div").append(artistImage)
    $("#artist-div").append($("<br>"));
    // $("#artist-div").append(artistURL);
    $("#artist-div").append($("<br>"));
    $("#artist-div").append(artistImage2);
    $("#artist-div").append($("<br>"));
    $("#artist-div").append(bio);
  });

  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#artist-div").append($("<br>"));
    $("#artist-div").append($("<br>"));

    for (i = 0; i < 5; i++) {
      eventNamesList.push(response._embedded.events[i].name);
      eventURLList.push(response._embedded.events[i].url);

      $("#concert-div").append(eventNamesList[i] + "     ");
      $("#concert-div").append(eventURLList[i]);

      console.log(response._embedded.events[0].url);

      $("#artist-div").append($("<br>"));



    }


  });
}

// Event handler for user clicking the select-artist button
$("#select-artist").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the artist name
  var inputArtist = $("#artist-input").val().trim();

  // Running the searchBandsInTown function (passing in the artist as an argument)
  window.location.href = "bio.html?" + inputArtist;
});
