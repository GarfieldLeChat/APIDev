/**
 * Bindings for page elements
 */
const search = document.getElementById('search');
const getTweets = document.getElementById('getTweets');
const output = document.getElementById('output');
const mesSender = document.getElementById('mesSender');

/**
 * Event Listeners
 */

/**
 * Search button
 * 
 */
search.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById('getTweets').click();
    }
  });

getTweets.addEventListener('click', getAllTweets);

 /**
 * Add Tweet
 * 
 */
mesSender.addEventListener('submit', addComment);

/**
 * Add Comment
 * 
 */

 function addComment() {
    event.preventDefault();
    let newTweetComment = {
        'comment': document.getElementById('newMessage').value
    };

    console.log(newTweetComment);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/comment/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF8');
    xhr.onreadystatechange = function() {
        if (xhr.readyState !=4 || xhr.status !=200) {
            return;
        }
        console.log(xhr.responseText);
    };
    xhr.send(JSON.stringify(newTweetComment));
}

/**
 * Get all Tweets - function
 *
 */  

function getAllTweets() {
    const url = '/tweets/' + search.value;
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
        outputTweets(data.statuses);
    }).catch(function(error){
        console.log(JSON.stringify(error));
    });
}

/**
 * Inital page load values from Lucid London twitter feed
 */

window.onload = function(){
    const url = '/tweets/LondonLucid';
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
        outputTweets(data.statuses);
    }).catch(function(error){
        console.log(JSON.stringify(error));
    });
  };

/**
 * Output Tweets - function 
 * 
 */
function outputTweets(data) {
    output.innerHTML = ''; 
    data.forEach(function(item,i){
        let hyper=`<a 
            href="https://twitter.com/i/web/status/${item.id_str}" 
            target="_blank">${item.text}</a>`;
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.innerHTML=`${hyper} <br />
        <small>${item.user.name} &nbsp; <br /> ${item.created_at}</small>
        <br /> &#10084; &nbsp; ${item.retweet_count}`;
        li.appendChild(span);
        output.appendChild(li);
    });
}