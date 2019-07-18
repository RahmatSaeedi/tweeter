$(document).ready(function() {
  // jQuery - ajax tweet submission
  $(".new-tweet form").submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: e.target.action,
      method: e.target.method,
      data: $(this).serialize()
    }).done((e) => {
      console.log('Tweeted successfuly');
    }).fail((e) => {
      console.log('Faild to Tweet');
    });
  });

  // Updates the counter
  $(".new-tweet textarea").on('keyup', function(e) {
    $(this).siblings('span').html(140 - $(this).val().length);
  });

  const createTweetElement = (tweet) => {
    const element = `
      <article class="tweet">
        <header class="Clearfix">
          <img src="${tweet.user.avatars}"/>
          <div>${tweet.user.name}</div>
          <div>${tweet.user.handle}</div>
        </header>
        <div class="tweet-text">${tweet.content.text}</div>
        <footer class="Clearfix">
          <div>${new Date(tweet.created_at)}</div>
          <div>like</div>
        </footer>
      </article>`;
    return element;
  };

});