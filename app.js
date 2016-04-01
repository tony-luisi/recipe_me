var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require ('fs');

var app = express();

// var recipeJSON = JSON.parse(recipe)
// console.log(recipe)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---------------------Ignore above here-------------------//
var recipe = {
      "publisher": "Simply Recipes",
      "f2f_url": "http://food2fork.com/view/36251",
      "title": "Easy Brazilian Cheese Bread",
      "source_url": "http://www.simplyrecipes.com/recipes/easy_brazilian_cheese_bread/",
      "recipe_id": "36251",
      "image_url": "http://static.food2fork.com/braziliancheesebreada300x200ffd79a7b.jpg",
      "social_rank": 100,
      "publisher_url": "http://simplyrecipes.com"
    }



app.get('/', function(req, res) {
 res.redirect('/search') // what is this doing?
})

app.get('/search', function(req, res) {
 res.render('searchRecipe')
})

app.get('/results', function(req, res) {
 res.render('results', recipe)
})

app.post('/results', function(req,res) {
  res.render('results', recipe)
})

module.exports = app;
