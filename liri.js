
require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");

var keys = require('./keys')

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
  var nodeArgs = process.argv;
  var movieName ="";
  for(var i=3; i<nodeArgs.length; i++) {
    if (i>3 && i<nodeArgs.length) {
      movieName= movieName + "+" +nodeArgs[i];
    } 
    else {
      movieName += nodeArgs[i];
    }
  }
  if (process.argv[3] ==="") {
    movieName="Mr+Nobody";
  }
  // var movieName = process.argv[3];
  // if (movieName =="") {
  //  movieName = "Mr Nobody"; 
  // }; 
    movieMe();
    break;
  case 'do-what-it-says':
    break;
}

//this function queries Spotify
function spotifyMe() {
  var spotify = new Spotify(keys.spotify);
  var songChoice = process.argv[3];

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

  var params = { screen_name: 'tiggity' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets[0].text);
    }
  });
}

//this function will query OMDB
function movieMe() {
  // var movieName = process.argv[3];
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function (error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {
    // Then we parse the body and print out the movie data
    console.log("Rating: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

    //need help on the Rotten tomatoes Ratings Value!
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});    
}
