var k = require("./keys.js");
var twit_key = k.twitterKeys.consumer_key;
var twit_secret = k.twitterKeys.consumer_secret;
var twit_token_key = k.twitterKeys.access_token_key;
var twit_token_secret = k.twitterKeys.access_token_secret;

var Twitter = require('twitter');
var moment = require('moment');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var os = require("os");

function execCommand(cmd) {

	fileLog(os.EOL + "Command: " + cmd + os.EOL + "Paramaters: " + qryParm + os.EOL);

	switch (cmd) {
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
			break;
		default:
			consoleAndFileLog("Invalid command! Please try again.")
	}

}

function getArguments() {
	var args = "";
	if (!(process.argv[3] == null)) {
	var i = 3;
	args = process.argv[i];
	i++;
	while (!(process.argv[i] == null)) {
		args = args + "+" + process.argv[i];
		i++; 
		} 
	}
	return args;
}

function formatParameters(parms) {
	//remove special characters that would break api search and replace space with '+' 
	parms = parms.replace(/[^a-zA-Z + 0-9]+/g,'');
	parms = parms.replace(/ /g, "+");

	return parms;
}

function consoleAndFileLog(txt) {
	console.log(txt);
	fileLog(txt);
}

function fileLog(txt) {
	var txtFile = "log.txt";

	fs.appendFile(txtFile, txt + os.EOL, function(err) {
		if (err) {
			console.log("error: " + err);
			return;
		}
	});
}

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
var writeThis = "";

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if(!error) {
	for (var i=0; i < tweets.length; i++) {
	  var tweetDate = Date.parse(tweets[i].created_at.replace(/( \+)/, ' UTC$1'));
	  var formattedDate = moment(tweetDate).format('LLLL');
	  writeThis = tweets[i].text + os.EOL + formattedDate + os.EOL;	
	  consoleAndFileLog(writeThis);
	}  
  } else {
	  consoleAndFileLog(error);
  } 
});
	
} // end myTweets function

function spotifyThisSong() {

if (qryParm === "") qryParm = "ace+of+base+the+sign";

spotify.search({ type: 'track', query: qryParm }, function(err, data) {
    if ( err ) {
        consoleAndFileLog('Error occurred: ' + err);
        return;
    }

	if (data.tracks.total > 0) { 
		var artistsCount = data.tracks.items[0].album.artists.length;
		var artists = "Artist(s): " + data.tracks.items[0].album.artists[0].name;
		if (artistsCount > 1) {
			for (var i = 1; i < artistsCount; i++) {
				artists = artists + "/g, " + data.tracks.items[0].album.artists[i].name
			}
		}

		var songTitle = "Song Title: " + data.tracks.items[0].name;
		var previewURL = "Preview URL: " + data.tracks.items[0].preview_url;
		var albumTitle = "Album Title: " + data.tracks.items[0].album.name;

		consoleAndFileLog(os.EOL + artists + os.EOL + songTitle + os.EOL + previewURL + os.EOL + albumTitle + os.EOL );
	} else {
		consoleAndFileLog(os.EOL + "No tracks were found! Please try again.");
	}

});
	
} // end spotifyThisSong function

function movieThis() {

if (qryParm === "") qryParm = "mr+nobody";

requestURL = "http://www.omdbapi.com/?t=" + qryParm + "&tomatoes=true";

request(requestURL, function (error, response, body) {
  if (!error && response.statusCode == 200) {
	  if (!(JSON.parse(body).Response == "False")) {
		var movieTitle = "Movie Title: " + JSON.parse(body).Title;
		var releaseYr = "Release Year: " + JSON.parse(body).Year;
		var imdbRating = "IMDB Rating: " + JSON.parse(body).imdbRating;
		var cntry = "Country(ies) Produced in: " + JSON.parse(body).Country;
		var lang = "Movie Language(s): " + JSON.parse(body).Language;
		var plot = "Movie Plot: " + JSON.parse(body).Plot;
		var actors = "Actors: " + JSON.parse(body).Actors;
		var rtRating = "Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating;
		var rtURL = "Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL;

		consoleAndFileLog(os.EOL + movieTitle + os.EOL + releaseYr + os.EOL + imdbRating + 
		os.EOL + cntry + os.EOL + lang + os.EOL + plot + os.EOL + actors + os.EOL + rtRating + os.EOL + rtURL + os.EOL );
		} else {
		consoleAndFileLog(os.EOL + "No movie found! Please try again.");
		}
  }
});

} // end movieThis function

function doWhatItSays() {

fs.readFile('random.txt', 'utf8', function(error, data) {
	var dataArr = data.split(',');
	var command = dataArr[0];
	var parameters = dataArr[1];

	if (!(parameters == null)) qryParm = formatParameters(parameters);
	execCommand(command);

});

}

//program starts here
var arguments = "";
var qryParm = "";

arguments = getArguments();
qryParm = formatParameters(arguments);

execCommand(process.argv[2]);
