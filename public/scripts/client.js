/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //// VARIABLES ////
  const $errorOver = $('#error-msg-over').hide();
  const $errorNull = $('#error-msg-null').hide();
  const $form = $('#tweet-form').hide();

  //////// NAVBAR BUTTON //////
  $("#new-tweet-button").click(() => {
    $form.slideToggle().find('textArea').focus();
  });
  /////////
  const createTweetElement = function(tweetData) {
    //TIMEAGO//
    const dateCreated = timeago.format(tweetData.created_at);
    //ESCAPE//
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    ///// TWEET ARTICLE /////
    const tweetForm = `
      <article class="tweet">
        <header class="tweet-header">
          <img src="${tweetData.user.avatars}" alt="User avatar">
            <p>${tweetData.user.name}</p>
            <p>${tweetData.user.handle}</p>
            </header>
              <div class="tweet-content">
               ${escape(tweetData.content.text)}
              </div>
              <footer>
              <span class="tweet-date">${dateCreated}</span>
              <div class="actions">
              <i class="fa fa-flag"></i>
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart"></i>
            </div>
          </footer>
        </article>
      `;
    return tweetForm;
  };
    
////************** RENDER TWEETS **************////
  const renderTweets = function(tweets) {
    
    const $tweetsContainer = $('#tweets-container').empty();
      
    for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };
////************* LOAD TWEETS **************////
  const loadTweets = function() {
    
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
      .then(function(response) {

        renderTweets(response);
      })
      .catch(function(error) {
        console.log('Error', error);
      });
  };

  loadTweets();

  $errorNull.slideUp();
  $errorOver.slideUp();

///////////*************  POST FORM *************////////////////// 
  $form.submit(function(event) {
    
    event.preventDefault();
    const tweetText = $('#tweet-text').val();

    ///Error validations///
    if (!tweetText) {
      $errorNull.slideDown();
      return;
    }
    if (tweetText.length > 140) {
      $errorOver.slideDown();
      return;
    }

    const formData = $(this).serialize();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData
    })
      .then(loadTweets);
    
    //Error notifications, text value, and counter all reset//
      $errorNull.slideUp();
      $errorOver.slideUp();
    $('#tweet-text').val('');
    $('.new-tweet .counter').text('140');

  });

});
