$(document).ready(function() {
  // Creates a new tweet element
  const createTweetElement = function(tweet, includeArticleTag) {
    includeArticleTag = arguments.length > 1 && arguments[1] !== undefined ? includeArticleTag : false;

    if (!includeArticleTag) {
      return '\
        <header class="Clearfix">\
          <img src="' + tweet.user.avatars + '"/>\
          <div>' + tweet.user.name + '</div>\
          <div>' + tweet.user.handle + '</div>\
        </header>\
        <div class="tweet-text">' + tweet.content.text + '</div>\
        <footer class="Clearfix">\
          <div>' + new Date(tweet.created_at) + '</div>\
          <div>like</div>\
        </footer>';
    } else {
      return '\
      <article class="tweet">\
        <header class="Clearfix">\
          <img src="' + tweet.user.avatars + '"/>\
          <div>' + tweet.user.name + '</div>\
          <div>' + tweet.user.handle + '</div>\
        </header>\
        <div class="tweet-text">' + tweet.content.text + '</div>\
        <footer class="Clearfix">\
          <div>' + new Date(tweet.created_at) + '</div>\
          <div>like</div>\
        </footer>\
      </article>';
    }
  };

  // Form validation:
  const validateForm = function(form) {
    const tweetLength = $(form).find('textarea').val().length;
    if (tweetLength > 0) {
      if (tweetLength < 141) {
        return true;
      } else {
        setTimeout(function() {
          alert('Too many characters are in your tweet!');
        },1);
        return false;
      }
    } else {
      setTimeout(function() {
        alert('Empty Tweet!');
      }, 1);
      return false;
    }
  };

  // jQuery - ajax tweet submission
  $(".new-tweet form").submit(function(e) {
    e.preventDefault();
    
    if (validateForm(this)) {
      $.ajax({
        url: e.target.action,
        method: 'POST',
        port: 80,
        data: $(this).serialize(),
        complete: null,   // Callback when finished
        error: null,      // Callback in case of error
        success: function() {  // Callbackin case of success response
          document.getElementById('tweets-container').innerHTML = '';
          loadTweets();
        },
        timeout: null    // Timeout before emitting fail
      }).done(function(e) {
        console.log('Tweeted successfuly');
      }).fail(function(e) {
        console.log('Faild to Tweet');
      });
    }
  });


  // Fetches and prepends tweets. via jQuery - ajax
  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      cache: false
    }).done(function(tweets) {
      tweets.forEach(function(tweet) {
        const article = document.createElement('article');
        article.classList.add('tweet');
        article.innerHTML = createTweetElement(tweet).trim();
        const tc = document.getElementById('tweets-container');
        tc.insertBefore(article, tc.childNodes[0]);
      });
      console.log('Obtained tweets successfuly');
    }).fail(function(e) {
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