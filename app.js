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

fs.readFile(__dirname + '/data/cats.json', 'utf8', loadCats);


function loadCats(err, data) {
  if (err) throw err;
  //console.log(data);

  var catObject = JSON.parse(data)
  console.log(catObject)
  cats = catObject

}

/*
var cats = {
 cats: [
  {id: 1, name: 'fluffy', image: 'http://i.imgur.com/opXS2I9.png', description: 'I am a cat and I eat mice'},
  {id: 2, name: 'tick', image: 'https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg', description: 'I had fun once, it was the best!@!!!'},
  {id: 3, name: 'hihi cat', image: 'https://lh3.googleusercontent.com/-bC6QWAPayr0/AAAAAAAAAAI/AAAAAAAAAAw/hBHAsBThPeo/photo.jpg', description: 'With this hihi sauce you will take over the world'}
 ]
}
*/

app.get('/', function(req, res) {
 res.redirect('/cats') // what is this doing?
})

app.get('/cats', function(req, res) {
 res.render('catsIndex', cats)
})

app.get('/cats/new', function(req, res) {
 res.render('catsNew')
})

app.get('/cats/help', function(req, res) {
  res.render('catsHelp')
})

app.get('/cats/:id', function(req,res){
  var catId = cats.cats.filter(function(x) {
    return x.id == req.params.id
  }); // try going to /cats/1
  res.render('catsShow', catId[0] )
})

app.post('/cats', function(req,res) {
  var newCat = req.body;
  delete newCat.commit
  newCat.id = cats.cats.length
  cats.cats.push(newCat)
  updateCatFile()
  res.redirect('/cats')
})

app.post('/cats/:id', function(req,res) {
  var updateCat = req.body;
  delete updateCat.commit
  updateCat.id = req.params.id
  cats.cats[req.params.id-1] = updateCat
  updateCatFile()
  res.render('catsShow', updateCat)
})

app.get('/cats/edit/:id', function(req, res) {
  var catId = cats.cats.filter(function(x) {
    return x.id == req.params.id
  });
  res.render('catsEdit', catId[0])
})


function updateCatFile(){
  fs.writeFile(__dirname + '/data/cats.json', JSON.stringify(cats), 'utf8', function(err, data){
      if (err) throw err;
      console.log('It\'s saved!');
    });
}


module.exports = app;
