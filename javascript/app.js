

function searchArtists (artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=ff8c47bf95be28a671e9ebc3a0e28a58&format=json";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      window.location.href="bio.html"



      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      var artistName = $("<h1>").html(response.artist.name);
      var artistURL = $("<a>").attr("href", response.url).append(response.artist.name);

      // var artistImage = $("<img>").attr("src", response.artist.image[0]["#text"]);
        var artistImage2 = $("<img>").attr("src", response.artist.image[2]["#text"]);
        var bio = $("<h6>").html(response.artist.bio.content);
     // var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
     // var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
     // var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistName);
      $("#artist-div").append($("<br>"));
      $("#artist-div").append(artistImage)
      $("#artist-div").append($("<br>"));
      $("#artist-div").append(artistURL);
       $("#artist-div").append($("<br>"));
      $("#artist-div").append(artistImage2);
      $("#artist-div").append($("<br>"));
       $("#artist-div").append(bio);
    });
  }

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
   window.location.href="bio.html?" + inputArtist;
  });
