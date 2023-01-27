var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var schema = mongoose.Schema;

router.use(bodyParser.urlencoded({extended: false}))


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register", async function(req, res){
  
})
module.exports = router;
