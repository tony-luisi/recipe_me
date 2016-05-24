var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require ('fs');
var request = require('superagent')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
 res.redirect('/search') //redirects to the search page
})

app.get('/search', function(req, res) {
 res.render('searchRecipe')
})

app.post('/results', function(req,res) {
  var ingredients = req.body.name
  if (ingredients[0].length < 1 && ingredients[1].length < 1 && ingredients[2].length < 1) {
    ingredients[0] = "marmite"
    ingredients[1] = "marmite"
    ingredients[2] = "marmite"
  }

  var query = escape(ingredients[0] + ','+ ingredients[1]+','+ingredients[2]) //to escape any insecure text!!

  request.get('http://food2fork.com/api/search?key=d38b86e56e463fc2a8efb429bf1a0992&q='+query)
  .set('Accept','application/json')
  .end(function(err,response){
    var recipeResponse = JSON.parse(response.text)
    recipeResponse.recipes[0].title = recipeResponse.recipes[0].title.replace(/&amp;/g, '&')
    res.render('results', recipeResponse.recipes[0])
  })

})

module.exports = app;
