const request = require('request');
var rp = require('request-promise');
var db = require('./../database/index.js')
const config = require('../config.js');

let getReposByUsername = (name) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + name + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    json: true,
    contentType: 'application/json'
  };

  function callback(data) {
    data.forEach(function(repo) {
      var temp = {username: repo.owner.login, reponame: repo.name, url:repo.html_url, forks: repo.forks}
      db.save(temp);
    })
  }

  rp(options).then(callback)
}

module.exports.getReposByUsername = getReposByUsername;