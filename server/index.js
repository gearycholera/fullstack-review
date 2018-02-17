const express = require('express');
var bodyParser = require('body-parser');
var getReposByUsername = require('./../helpers/github.js');
var db = require('./../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  console.log('server received from client: ' + JSON.stringify(req.body))
  getReposByUsername.getReposByUsername(req.body.word);
  res.send(req.body.word);
});

app.get('/repos', function (req, res) {
  db.getEm(function(result) {
    res.send(result);
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

