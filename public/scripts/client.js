/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
      
  /*const tweetData = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png",
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1682332505690
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
          "created_at": 1682418905690
        }
      ]

*/
  const $errorOver = $('#error-msg-over').hide();
  const $errorNull = $('#error-msg-null').hide();
  const $form = $('#new-tweet');
  const $newTweet = $('.new-tweet').hide();
  const $newCharCounter =$('#charCounter')

  $("#new-tweet-button").click(() => {
    $newTweet.slideToggle().find('textArea').focus();
  });
  
  // request to post
  $form.on("submit", (event) => {
    event.preventDefault();
    const data = $form.serialize();
    const tweetText = $('#tweet-text').val();

    if(!tweetText){
      $errorNull.slideDown();
      return;
    }
     if(tweetText.length > 140) {
      $errorOver.slideDown();
      return;
    }

    

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data
    })
    
    .then(()=> {
      $("#tweet-text").val('');
      loadTweets();
    
    $errorNull.slideUp();
    $errorOver.slideUp();
    $newCharCounter.val(140);
  });
});


  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  
  /// creates new tweet elements
    const createTweetElement = function(tweet) {
      let $tweet = $(`
        <article class="tweet">
        <header class="tweet-header">
          <span class="tweet-avatar"><img src="${tweet.user.avatars}" alt="tweeter avatar"></span>
          <span class="tweet-id tweet-user"> ${tweet.user.name} </span>
          <span class="tweet-id tweet-username">${tweet.user.handle}</span>
        </header>
        <div class='tweet-content'>
        <p>
          ${escape(tweet.content.text)}
        </p>
      </div>
        <footer class="tweet-footer">
          <span class="tweet-date">${timeago.format(tweet.created_at)}</span>
          <div id='tweet-icons'>
            <i class="icon1 fa-solid fa-flag"></i>
            <i class="icon2 fas fa-retweet"></i>
            <i class="icon3 fa-solid fa-heart"></i>
          </div>
         </footer>
        </article>
      `);
    
      return $tweet;
    }
  // renders tweets and adds them to the DOM
    const renderTweets = (tweets) => {

      for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
    };
    
    //loads tweets
    const loadTweets = function(){
      $.ajax({
        method: "GET",
        url: "/tweets"
      })
      .then((tweets)=> {
        renderTweets(tweets)
      })
};
    
    loadTweets();  
    
  
    });







