console.log('Twitter Bot Is Starting');

var tweet_content;

var Twit = require('twit');

const mastodon = require('mastodon-api'); 
const ENV = require('dotenv');
ENV.config();

var config = require('./config');
var T = new Twit(config);

var M = new mastodon({
	client_key: process.env.CLIENT_KEY,
	client_secret: process.env.CLIENT_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	timeout_ms: 60*1000,
	api_url: 'https://botsin.space/api/v1/',
})


var stream = T.stream('statuses/filter', { follow: [2282671736, 1244325504, 3241065977,  	

828640738065805312, 2820666877]})

stream.on('tweet', tweetEvent); 

function tweetEvent(tweet){
	var fs = require('fs');
	var json = JSON.stringify(tweet, null, 2);
	fs.writeFile("tweet.json", json);
	//console.log(tweet)
	if(tweet.user.screen_name == "TheCWSupergirl" || tweet.user.screen_name == "CW_TheFlash" || tweet.user.screen_name == "blacklightning" || tweet.user.screen_name == "CW_Arrow" || tweet.user.screen_name == "TheCW_Legends"){
		
		if(tweet.retweeted_status){
			console.log('Retweet')
		}
		else if(tweet.truncated == false){
			console.log(tweet.truncated)
			console.log('Extended')
			tweet_content = 'From ' + tweet.user.name + ':' + tweet.text
			MastaPost()
		}
		else if(tweet.truncated == true){
			console.log(tweet.truncated);
			console.log(tweet.extended_tweet.full_text)
			console.log('Normal')
			tweet_content = 'From ' + tweet.user.name + ':' + tweet.extended_tweet.full_text + " #Arrowverse #TheCW"
			MastaPost();
			}
	}
	else{
		console.log('Not Valid')
	}
}


function GetTweet() {
		
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

function TweetIt() {

	//var r = Math.floor(Math.random()*100);
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


function MastaPost() {

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


//setInterval(GetTweet, 1000*5)
//setInterval(MastaPost, 1000*6)

