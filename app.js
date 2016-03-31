var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require ('fs');

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
  console.log("do something")
  res.render('results')
})

module.exports = app;
