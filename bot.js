console.log('Twitter Bot Is Starting');

const mastodon = require('mastodon-api');
const ENV = require('dotenv');
ENV.config();
var M = new mastodon({
	client_key: process.env.CLIENT_KEY,
	client_secret: process.env.CLIENT_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	timeout_ms: 60*1000,
	api_url: 'https://botsin.space/api/v1/',
})

var tweet_content;
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var stream = T.stream('statuses/filter', { follow: [2282671736, 1244325504, 3241065977,

828640738065805312, 2820666877]})

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){ // Follows Twitter feeds from specified accounts
	if(eventMsg.user.screen_name == "TheCWSupergirl" || eventMsg.user.screen_name == "CW_TheFlash" || eventMsg.user.screen_name == "blacklightning" || eventMsg.user.screen_name == "CW_Arrow" || eventMsg.user.screen_name == "TheCW_Legends"){
		if(eventMsg.retweeted_status){
			console.log('Retweet')
		}
		else if(eventMsg.truncated == false){
			console.log(eventMsg.truncated)
			console.log('Not Truncated')
			MastaPost()
		}
		else if(eventMsg.truncated == true){
			console.log(eventMsg.truncated);
			console.log(eventMsg.extended_eventMsg.full_text)
			console.log('Truncated')
			tweet_content = 'From ' + eventMsg.user.name + ': ' + eventMsg.extended_eventMsg.full_text + " #Arrowverse #TheCW"
			MastaPost();
			}
	}
}

function MastaPost() { // Posts (Toots) to botsin.space

	var mastaparams ={
		status: tweet_content
	}

	console.log(tweet_content);
	M.post('statuses', mastaparams, (error, mdata) => {
		if(error) {
			console.error(error);
		}
		else{
			console.log(tweet_content)
			console.log(mdata)
			console.log('Toot!')
		}
	})
}

/*
function GetTweet() { // Retrieves an individual or list of tweets via search function

	var twitterparams = {
		q: '-RT from:CW_TheFlash',
		tweet_mode: 'extended',
		count: 1
		}

	T.get('search/tweets', twitterparams, gotData);

	function gotData(err, data, response) {
		//console.log(data)
		var tweets = data.statuses;
		for(var i = 0; i < tweets.length; i++){
			if(tweets[i].retweeted_status){
				console.log('The Flash Reweeted: ' + tweets[i].full_text);
			}
			else{
				console.log(tweets[i].full_text);
				tweet_content = tweets[i].full_text;
			}
		}
		if(err){
			console.log("Something went wrong with gotData!");
		}
		else{
			console.log("It Worked!");
		}
	}
}

function TweetIt() { // Posts tweets to twitter
		var tweet = {
		status: tweet_content
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if(err){
			console.log("Something went wrong when tweeting");
		}
		else{
			console.log("I Tweeted!");
		}
	}
}

*/
