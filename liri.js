
require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require('./keys')
var fs = require('fs');

var client = new Twitter(keys.twitter);

//cool trick my tutor taught me to use switch(command) instead of if statements  :-)
var command = process.argv[2];
switch (command) {
  case 'my-tweets':
    twitterMe();
    //do something
    break;
  case 'spotify-this-song':
    spotifyMe();
    //do something else
    break;
  case 'movie-this':
    // var movieName = process.argv[3];
    var term = process.argv.slice(3).join(" ");

    if (!term) {
      term = "Mr Nobody";
    };

    movieMe();
    break;
  case 'do-what-it-says':
    doRandom();
    break;
}

//this function queries Spotify
function spotifyMe() {
  var spotify = new Spotify(keys.spotify);
  var songChoice = process.argv.slice(3).join(" ");

  //used the type: track option, type: album is an option too but this seems right
  spotify.search({ type: 'track', query: songChoice, }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);

  });
}

//this function queries Twitter and shows my tweets
function twitterMe() {
  var client = new Twitter(keys.twitter);
  //hardcode my Twitter handle created just for this homework
  var params = { screen_name: 'tiggity2' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    // if (!error) {
    //heading for visual purposes
    console.log("Here are your recent Tweets.  Are you embarrassed yet?");
    console.log("--------------");
    for (var i = 0; i < tweets.length; i++) {
      //tweet date
      console.log(tweets[i].created_at);
      //actual tweet
      console.log(tweets[i].text);
      console.log("--------------");
    };
  }
  )
};
// }

//this function will query OMDB
function movieMe() {
  // var movieName = process.argv[3];
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Then we parse the body and print out the movie data
      console.log("Rating: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

      //need help on the Rotten tomatoes Ratings Value!
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

function doRandom() {

  fs.readFile("random.txt", 'utf8', function (err, data) {
    var spotify = new Spotify(keys.spotify);
    //only grab the actual song name from random.txt file
    var songChoice = data.slice(19, -1);
    // console.log(songChoice);
    spotify.search({ type: 'track', query: songChoice, }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].preview_url);
      console.log(data.tracks.items[0].album.name);

    });
    // console.log(data);
  })
}