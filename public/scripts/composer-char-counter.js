
$(document).ready(function(){
  
$(".new-tweet textarea").on("input", function(){
  const tweetLength = $(this).val().length;
  const charLeft = 140 - tweetLength;
  const counter = $(this).siblings('.new-tweet-submit').find('.counter');
counter.text(charLeft);
if (charLeft < 0) {
  counter.addClass("counter-red");
  }
else {
  counter.removeClass("counter-red");
}
});
});


