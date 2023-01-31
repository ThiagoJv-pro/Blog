var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var schema = mongoose.Schema;

router.use(bodyParser.urlencoded({extended: false}));

