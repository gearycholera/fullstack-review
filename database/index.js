const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var uniqueValidator = require('mongoose-unique-validator');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  reponame: String,
  url: {type: String, unique: true},
  forks: Number

});

repoSchema.plugin(uniqueValidator);

let Repo = mongoose.model('Repo', repoSchema);

let save = (obj) => {
  var repo = new Repo(obj);
  repo.save(function(err) {
    if (err) {
      console.log('error adding to database:' , err)
    } else {
      console.log('added successfully to database');
    }
  })
}

var test = [];

let getEm = (callback) => {

  console.log('getEm');
  Repo.find({}).sort({forks: -1}).limit(25).then(callback);
}

module.exports.save = save;
module.exports.getEm = getEm;