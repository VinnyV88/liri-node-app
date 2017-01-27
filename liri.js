var k = require("./keys.js");
var twit_key = k.twitterKeys.consumer_key;
var twit_secret = k.twitterKeys.consumer_secret;
var twit_token_key = k.twitterKeys.access_token_key;
var twit_token_secret = k.twitterKeys.access_token_secret;

var Twitter = require('twitter');
var moment = require('moment');
var spotify = require('spotify');

var command = process.argv[2];

function myTweets() {

var client = new Twitter({
  consumer_key: twit_key,
  consumer_secret: twit_secret,
  access_token_key: twit_token_key,
  access_token_secret: twit_token_secret
});

var params = {
	screen_name: 'VinnyV88',
	count: 20
};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if(!error) {
	for (var i=0; i < tweets.length; i++) {
	  console.log(tweets[i].text);
	  console.log(moment(tweets[i].created_at).format("LLLL"));
	  console.log("");	
	}  
  } else {
	  console.log(error);
  } 
});
	
} // end myTweets function

function spotifyThisSong() {

// var params = {
// 	screen_name: 'VinnyV88',
// 	count: 20
// };

spotify.search({ type: 'track', query: 'ace of base the sign' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
	var artistsCount = data.tracks.items[0].album.artists.length;
	var artists = "Artist(s): " + data.tracks.items[0].album.artists[0].name;
	if (artistsCount > 1) {
		for (var i = 1; i < artistsCount; i++) {
			artists = artists + ", " + data.tracks.items[0].album.artists[i].name
		}
	}

	var songTitle = "Song Title: " + data.tracks.items[0].name;
	var previewURL = "Preview URL: " + data.tracks.items[0].preview_url;
	var albumTitle = "Album Title: " + data.tracks.items[0].album.name;

	console.log(artists + "\n" + songTitle + "\n" + previewURL + "\n" + albumTitle + "\n" );
    // Do something with 'data' 
});
	
} // end spotifyThisSong function





//program starts here

switch (command) {
	case "my-tweets":
		//do twitter stuff
		myTweets();
		break;
	case "spotify-this-song":
		//do spotify stuff
		spotifyThisSong();
		break;
	case "movie-this":
		//do omdb stuff
		movieThis();
		break;
	case "do-what-it-says":
		//do stuff
		doWhatItSays();
}

