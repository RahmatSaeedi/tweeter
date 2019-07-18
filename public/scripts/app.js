$(document).ready(function() {
  // Creates a new tweet element
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

  // jQuery - ajax tweet submission
  $(".new-tweet form").submit(function(e) {
    e.preventDefault();
    if ($(this).serialize().length > 5) {
      $.ajax({
        url: e.target.action,
        method: 'POST',
        data: $(this).serialize()
      }).done((e) => {
        console.log('Tweeted successfuly');
      }).fail((e) => {
        console.log('Faild to Tweet');
      });
    } else {
      console.log('Empty tweet!');
    }

  });


  // Fetches tweets via jQuery - ajax
  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET'
    }).done((tweets) => {
      tweets.forEach(function(tweet) {
        console.log(tweet);
        $('#tweets-container').prepend(createTweetElement(tweet));
      });
      console.log('Obtained successfuly');
      //console.log(tweets);
    }).fail((error) => {
      console.log('Faild to get tweets');
    });
  };

  // Updates the character counter for new-tweet
  $(".new-tweet textarea").on('keyup', function(e) {
    $(this).siblings('span').html(140 - $(this).val().length);
  });

  // Loads the initial tweets
  loadTweets();
});