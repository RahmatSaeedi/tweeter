$(document).ready(function() {
  // sets up
  $(".new-tweet-submit").on('click', function(e) {
    alert(JSON.stringify(this));
    //$(this).css('color', 'red');
    e.preventDefault();
  });

  // Updates the counter
  $(".new-tweet-text").on('keyup', function(e) {
    $(this).siblings('span').html(140 - $(this).val().length);
  });


});
