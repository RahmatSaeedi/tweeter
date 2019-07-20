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
          <div>' + moment(tweet.createdAt) + '</div>\
          <div><div class="flag">&#x2691;</div></div>\
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
          <div>' + moment(tweet.createdAt) + '</div>\
          <div><div class="flag">&#x2691;</div></div>\
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
        addMessage('Too many characters are in your tweet!', false);
        return false;
      }
    } else {
      addMessage('Empty Tweet!', false);
      return false;
    }
  };

  // jQuery - ajax tweet submission
  $("#new-tweet form").submit(function(e) {
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
          addMessage('Tweeted \u2003 \u27FF', true);
          loadTweets();
        },
        timeout: null    // Timeout before emitting fail
      }).done(function() {
        console.log('Tweeted successfuly');
      }).fail(function() {
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
      const section = document.createElement('section');
      section.id = "tweets-container";
      tweets.forEach(function(tweet) {
        const article = document.createElement('article');
        article.classList.add('tweet');
        article.innerHTML = createTweetElement(tweet).trim();
        section.insertBefore(article, section.childNodes[0]);
      });
      
      document.getElementById('tweets-container').replaceWith(section);
      console.log('Obtained tweets successfuly');
    }).fail(function() {
      console.log('Faild to get tweets');
    });
  };

  // Updates the character counter for new-tweet
  $("#new-tweet textarea").on('input', function() {
    $(this).siblings('span').html(140 - $(this).val().length);
  });

  // Loads the initial tweets
  loadTweets();

  // Add event listener for Navbar toggle button
  $('#navToggler').on('click', function() {
    $('#new-tweet').slideToggle();
  });


  const moment = function(_date) {
    const difference =  Date.now() - _date;
    let r;
    if (difference < 1000) {
      r = 'just now';
    } else if (difference < 60000) {
      r = Math.floor(difference / 1000) + ' seconds ago';
    } else if (difference < 360000) {
      r = Math.floor(difference / 60000) + ' minutes ' + Math.floor(difference / 1000) % 60 + ' and seconds ago';
    } else if (difference < 3600000) {
      r = Math.floor(difference / 60000) + ' minutes ago';
    } else if (difference < 86400000) {
      r = Math.floor(difference / 3600000) + ' hours ' + Math.floor(difference / 60000) % 60 + ' and minutes ago';
    } else if (difference < 259200000) {
      r = Math.floor(difference / 86400000) + ' days ' + Math.floor(difference / 3600000) % 24 + ' and hours ago';
    } else if (difference < 2592000000) {
      r = Math.floor(difference / 86400000) + ' days ago';
    } else if (difference < 31104000000) {
      r = Math.floor(difference / 2592000000) + ' months ago';
    } else {
      r = Math.floor(difference / 31104000000) + ' years ago';
    }
    return r;
  };

  $(window).scroll(function() {
    if ($(this).scrollTop() > 700) {
      $('#scrollUp').css('display','block');
    } else {
      $('#scrollUp').css('display','none');
    }
  });

  $('#scrollUp').on('click', function() {
    console.log('go up');
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  });

  const addMessage = function(messageString, type) {
    type = typeof(type) === 'boolean' ? type : false;
    if (type) {
      let node = document.createElement('div');
      node.classList.add('success');
      node.innerText = messageString;
      let r = document.getElementById("messages").appendChild(node);
      $(r).fadeOut(5000, function() {
        $(this).remove();
      });
    } else {
      let node = document.createElement('div');
      node.classList.add('error');
      node.innerText = messageString;
      let r = document.getElementById("messages").appendChild(node);
      $(r).fadeOut(5000, function() {
        $(this).remove();
      });
    }
  };
});