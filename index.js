/**
 * Constants required to build expres server and add in the 
 * connection functionality for twitter backend service.
 */

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const twit = require('twit');

/**
 * Twitter API KEYS etc which allow us to use OAuth to authenticate
 */

const T = new twit({
    consumer_key:         'FIXz4vT5gNoBmBz58Nes8YbDV',
    consumer_secret:      'ngXdfJwCkQ5VODBE6trtYgiOt2nVNauAHzsbuwICryksIqCkoW',
    access_token:         '1048685218515890176-EK7RpdlQyvdLd4QBgShBRXyjp5taJi',
    access_token_secret:  'a9IbhgZolaexqtZjg68uBw1LTkJzzTl3NvRlUHF9rbJUz',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  });

 /** 
  * Express Build to allow us to route via our local web app 
  * and also to parse the JSON objects returned
  */
  
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'scripts')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:false
    })
);

/** 
 * Twitter code. 
 * How to get the Tweets or post them
 */

 /**
  * Search Tweets
  */
app.get('/tweets/:search', function(req,res){
    T.get('search/tweets', { 
        q: req.params.search, 
        count: 10 
    }, function(err, data, response) {
        res.json(data);
      });
});

/**
 * Post Tweets
 */
app.post('/comment/', function(req,res){
    T.post('statuses/update', {
        status: req.body.comment
    }, function(err, data, response) {
        res.json(data);
      });
});
 
app.listen(3000);