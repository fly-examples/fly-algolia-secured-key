require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || '8080';
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ADMIN_API_KEY);
const index = client.initIndex('contacts');

app.use(express.static('src'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/html/index.html');
});

app.get('/index', function (req, res) {
  // Import contacts.json
  const contactJSON = require('./contacts.json');

  // Push data to the index if it does not exist yet.
  index.exists().then(exists => {
    if (!exists) {
      index.saveObjects(contactJSON, {
        autoGenerateObjectIDIfNotExist: true
      }).then(({ objectIDs }) => {
        // Set attributes to be searched
        index.setSettings({
          searchableAttributes: [
            'lastname',
            'firstname',
            'company',
            'email',
            'city',
            'address'
          ]
        }).then(() => {
          res.send('Index created.');
        }).catch(e => console.error(e));
      }).catch(e => console.error(e));
    } else {
      res.send('Index already exists.');
    }
  }).catch(e => console.error(e));
});

app.get('/key', function (req, res) {
  // An addHours date function
  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  };

  // Generate Algolia API Key and set it to expire in 1 hour
  const securedKey = client.generateSecuredApiKey(
    process.env.ALGOLIA_SEARCH_ONLY_KEY,
    {validUntil: new Date().addHours(1).getTime()}
  );

  return res.json({
    'algolia_app_id': process.env.ALGOLIA_APP_ID,
    'secured_api_key': securedKey
  });
});

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
