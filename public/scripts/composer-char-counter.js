
$(document).ready(function() {

  let textarea = $('.new-tweet form textarea');

  textarea.on('input', function() {

    let textLength = $(this).val().length;
    let charLeft = 140 - textLength;

    $('.new-tweet .counter').text(charLeft);

    if (charLeft < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }

  });
});

