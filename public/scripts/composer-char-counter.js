
$(document).ready(function() {
  
  let textarea = $('.new-tweet form textarea');
  let counter = textarea.siblings('.counter');


  textarea.on('input', function() {

    let length = $(this).val().length;
    console.log('Input length line 14', length);

    
    let remaining = 140 - length;
    console.log('remaining characters line, 18', remaining);


    $('.new-tweet .counter').text(remaining);

    
    if (remaining < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }

  });
});
  
