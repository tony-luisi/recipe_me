'use strict'

var test    = require('tape')
var request = require('supertest')
var fs      = require('fs')
var path    = require('path')
var cheerio = require('cheerio')

var app  = require('../app.js')

var RECIPE_TEST_DB = path.join(__dirname, '../data/recipe.json')

var TEST_CATS = [
    { id: 1, name: "Fluffy" },
    { id: 2, name: "Muffy" },
    { id: 3, name: "Morris"}
  ]

var BLANK_DB = []

test('POST /search/', function (t) {
  request(app)
    .post('/search')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .send({name: ['milk', 'bread', 'eggs']})
    .end(function (err, res) {

      // res.text should be the output of your template
      // write a test here to ensure that there are six images representing
      // the six cats in your output. You'll probably want a Regex.
      var $ = cheerio.load(res.text)
      //console.log(res.text)
      var images = $('img')

      t.equal(images.length, 1, "the number of images in the page is 1")
      t.end()
    })

})

test('POST /search/no ingredients', function (t) {
  request(app)
    .post('/search')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .send({name: ['', '', '']})
    .end(function (err, res) {

      // res.text should be the output of your template
      // write a test here to ensure that there are six images representing
      // the six cats in your output. You'll probably want a Regex.
      var $ = cheerio.load(res.text)
      console.log(res.text)
//      var images = $('img')

  //    t.equal(images.length, 1, "the number of images in the page is 1")
      t.end()
    })

})
