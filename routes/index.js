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

var title="";
var subtitle="";
var doc = "";
router.get("/newpost", async function (req, res) {
  
  res.render("newpost", { title: "Tela de Postagem", action: "/newpost"})
  cont ++ ;

}).post("/newpost", async function (req, res) {
   title = req.body.title;
   subtitle = req.body.subtitle;
  var content = req.body.content;
  var date = new Date();
  var newPost = await mongoose.registerPost({
    title: title,
    subtitle: subtitle,
    content: content,
    date: date.toUTCString(),
    count: cont
  });
  doc = await completion.returnCorrect(content);
  
  console.log("Saved Successfully");
  await newPost.save();
  res.redirect("/homepage");

}).get("/newpost/update/:_id", async function(req, res){
  doc = doc;
  // var db = mongoose.registerPost;
  // var id = req.params._id;
  // var dbid = db.findById({_id: id})
  res.render("newpostupdate", { title: "Tela de Postagem", action: "/newpost", title: title, subtitle: subtitle, content: doc})
})


 


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
  
  res.render("home", {
    title: "HomePage", 
    doc1: await post.findOne({count: {$eq: 1}}), 
    doc2: await post.findOne({count: {$eq: 6}}), 
    doc3: await post.findOne({count: {$eq: 2}}),
    doc4: await post.findOne({count: {$eq: 3}})
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