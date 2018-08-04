
require("dotenv").config();

var Spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var Twitter = require('twitter');


// Basic Node application for requesting data from any website
// Here we incorporate the "request" npm package
var request = require('request');
// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}




// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function (error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Then we parse the body and print out the movie data
    console.log("rating: " + JSON.parse(body).Title);
    console.log("rating: " + JSON.parse(body).Year);
    console.log("rating: " + JSON.parse(body).imdbRating);
    console.log("rating: " + JSON.parse(body).Rating.value);
    console.log("rating: " + JSON.parse(body).Country);
    console.log("rating: " + JSON.parse(body).Language);
    console.log("rating: " + JSON.parse(body).Plot);
    console.log("rating: " + JSON.parse(body).Actors);
  }
});
