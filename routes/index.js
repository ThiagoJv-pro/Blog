require('dotenv').config();
var mongoose = require("../db");
var completion = require("./api/generate")
var express = require('express');
var router = express.Router();
const {Configuration, OpenAIApi} = require("openai");
var bodyParser = require("body-parser");
const { response } = require('express');

let cont = 1;

router.use(bodyParser.urlencoded({ extended: false }))


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express' });
});


 
var formData = {};
var doc = "";
router.get("/newpost",  async function (req, res) {
  
  res.render("newpost", { title: "Tela de Postagem", action: "/newpost"})

}).post("/newpost",async function (req, res) {
  var title = req.body.title;
  var subtitle = req.body.subtitle;
  var content = req.body.content;
  var date = new Date();
  
  doc = await completion.returnCorrect(content);
  res.redirect("/newpost/update/");
  formData["title"] = title;
  formData["subtitle"] = subtitle;
  formData["content"] = content;
  formData["date"] = date;

}).get("/newpost/update/", async function(req, res){
  doc = doc;
  res.render("newpostupdate", { title: "Tela de Postagem", action: "/newpost", title: formData.title, subtitle: formData.subtitle, content: doc})
}).post("/newpost/update/", async function(req, res){

  const maxOrder = await mongoose.registerPost.find().sort({order: -1}).limit(1).exec();
  const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 1;
  var newPost = await mongoose.registerPost({
    title: formData.title,
    subtitle: formData.subtitle,
    content: doc,
    date: formData.date,
    order: newOrder
  });
  
  await newPost.save();
  console.log("Saved Successfully");
  res.redirect("/homepage");

});

 


router.get("/register", function (req, res) {
  res.render("register", { title: "Tela de Cadastro", action: "/register" })
}).post("/register", async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var register = new mongoose.registerUser({
    email: email,
    password: password
  });

  await register.save();

  console.log("Saved");
  res.redirect("/");
});


router.post('/', async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = mongoose.registerUser;
  var userdb = await user.findOne({ email: email, password: password }) //validar email e senha 

  console.log(email + "" + userdb);

  if (userdb) {
    res.redirect('/homepage');
  } else {
    console.log("Credenciais incorretas");
  }
});


router.get('/homepage', async function (req, res) {
  let post = mongoose.registerPost;
  var count = await post.countDocuments({__v : 0})
  console.log(Math.floor(Math.random(1) * count));

  res.render("home", {
    title: "HomePage", 
    doc1: await post.findOne({order: {$eq: Math.floor(Math.random(1) * count)}}), 
    doc2: await post.findOne({order: {$eq: Math.floor(Math.random(1) * count)}}), 
    doc3: await post.findOne({order: {$eq: Math.floor(Math.random(1) * count)}}),
    doc4: await post.findOne({order: {$eq: Math.floor(Math.random(1) * count)}})
  })
})

router.get('/content/:_id', async function (req, res){
  var post =  mongoose.registerPost;
  var idparams = req.params._id
  console.log(await post.findById({_id: idparams}))
  res.render("post", {title: "Postagem", doc:  await post.findById({_id: idparams})
})

})





module.exports = router;



/**
"eq" (equal): {field: value}
"ne" (not equal): {field: {$ne: value}}
"gt" (greater than): {field: {$gt: value}}
"gte" (greater than or equal to): {field: {$gte: value}}
"lt" (less than): {field: {$lt: value}}
"lte" (less than or equal to): {field: {$lte: value}}
"in" (in an array): {field: {$in: [value1, value2, ...]}}
"nin" (not in an array): {field: {$nin: [value1, value2, ...]}}
"exists" (field exists or not): {field: {$exists: true/false}}
"regex" (regular expression): {field: {$regex: /pattern/}} 
*/