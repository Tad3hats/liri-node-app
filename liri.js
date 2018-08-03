
require("dotenv").config();


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// Basic Node application for requesting data from any website
// Here we incorporate the "request" npm package
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});



// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" + response + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
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
