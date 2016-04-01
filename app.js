var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require ('fs');
var request = require('superagent')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---------------------Ignore above here-------------------//

app.get('/', function(req, res) {
 res.redirect('/search') // what is this doing?
})

app.get('/search', function(req, res) {
 res.render('searchRecipe')
})

app.post('/search', function(req,res) {
  request.get('http://food2fork.com/api/search?key=d38b86e56e463fc2a8efb429bf1a0992&q=milk')
  .set('Accept','application/json')
  .end(function(err,response){
    var recipeResponse = JSON.parse(response.text)
    res.render('results', recipeResponse)
  })

})

module.exports = app;
