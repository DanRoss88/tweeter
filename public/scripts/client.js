/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // request to ppost

  $.ajax(
  "/tweets" , "POST"
)



  const tweetsData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1682287216995
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1682373616995
    }
  ];
// renders tweets and adds them to the DOM
  const $renderTweets = function(tweetsData) {

    for (const tweetData of tweetsData) {
      const $tweet = createTweetElement(tweetData);
      console.log("$tweet")
      $('#tweets-container').prepend($tweet);
    };
  };
/// creates new tweet elements
  const createTweetElement = function(tweetData) {
    let $tweet = $(`
        <article class="tweet">
        <header class="tweet-header">
          <span class="tweet-avatar"><img src="${tweetData.user.avatars}" alt="tweeter avatar"></span>
          <span class="tweet-id tweet-user"> ${tweetData.user.name} </span>
          <span class="tweet-id tweet-username">${tweetData.user.handle}</span>
        </header>
        <div class='tweet-content'>
        <p>
          ${tweetData.content.text}
        </p>
      </div>
        <footer class="tweet-footer">
          <span class="tweet-date">${tweetData.created_at}</span>
          <div id='tweet-icons'>
            <i class="icon1 fa-solid fa-flag"></i>
            <i class="icon2 fas fa-retweet"></i>
            <i class="icon3 fa-solid fa-heart"></i>
          </div>
         </footer>
        </article>
      `);
    console.log("$tweet", $tweet);
    return $tweet;
  };
  
  $renderTweets(tweetsData);

});







