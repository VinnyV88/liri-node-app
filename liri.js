var k = require("./keys.js");
var twit_key = k.twitter_keys.consumer_key;
var twit_secret = k.twitter_keys.consumer_secret;
var twit_token_key = k.twitter_keys.access_token_key;
var twit_token_secret = k.twitter_keys.access_token_secret;

var command = process.argv[2];

function myTweets() {


	
}






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

