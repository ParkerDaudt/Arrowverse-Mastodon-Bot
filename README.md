# Twitter Bot

The provided code initializes a Twitter bot that listens to tweets from specified accounts and toots (posts) their content on the Mastodon instance botsin.space with the hashtags #Arrowverse and #TheCW.

## Code Overview

1. Import required modules and initialize the Mastodon API and Twitter API clients.

   - Import `mastodon-api`, `dotenv`, and `twit` modules.
   - Load environment variables using `dotenv`.
   - Create Mastodon and Twitter API clients using the loaded environment variables and a configuration file.

2. Set up a Twitter stream to follow specified accounts.

   - Create a stream that filters tweets from specific accounts (based on user IDs).
   - Set up an event listener for the 'tweet' event, calling the `tweetEvent` function when triggered.

3. Define the `tweetEvent` function.

   - Check if the tweet is from one of the specified accounts.
   - If the tweet is a retweet, log 'Retweet'.
   - If the tweet is not truncated, log 'Not Truncated' and build the content string with the tweet's text, then call `MastaPost`.
   - If the tweet is truncated, log 'Truncated' and build the content string with the tweet's full text from the `extended_eventMsg` object, then call `MastaPost`.

4. Define the `MastaPost` function.

   - Create an object with the status property set to the tweet content.
   - Log the tweet content.
   - Post the tweet content to Mastodon using the `post` method.
   - If there's an error, log the error; otherwise, log the tweet content, the returned data, and 'Toot!'.
