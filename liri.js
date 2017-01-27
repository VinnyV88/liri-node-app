var k = require("./keys.js");
var twit_key = k.twitterKeys.consumer_key;
var twit_secret = k.twitterKeys.consumer_secret;
var twit_token_key = k.twitterKeys.access_token_key;
var twit_token_secret = k.twitterKeys.access_token_secret;

var Twitter = require('twitter');
var moment = require('moment');

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

