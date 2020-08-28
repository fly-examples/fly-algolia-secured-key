require('dotenv').config();

var express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT
const algoliasearch = require('algoliasearch');

app.use(express.static('src'));

// TODO: Get Algolia Secrets
ALGOLIA_APP_ID = ''
ALGOLIA_SEARCH_ONLY_KEY = ''


// TODO: Create an Index on Algolia


// TODO: push data to the contact Index on Algolia


app.get('/', function (req, res) {
  // send index.html
  res.sendFile(__dirname + '/src/html/index.html');
});

// TODO: Generate a Secured API Key for Search, and sent to the front-end


app.listen(port, function () {
  console.log(`Simple Searcher App listening on port ${port}!`);
});