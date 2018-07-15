// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#search-box').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(str);
  });
}


handleAPILoaded();
search();
//
// $("#search-button").on("click", function(event) {
//     event.preventDefault();
//     alert("worked");
//
//     handleAPILoaded();
//     search();
//   });
