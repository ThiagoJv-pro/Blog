require('dotenv').config();
var mongoose = require("../db");
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({ extended: false }))


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get("/newpost", async function (req, res) {
  res.render("post", { title: "Tela de Postagem", action: "/newpost" })
}).post("/newpost", async function (req, res) {
  var title = req.body.title;
  var subtitle = req.body.subtitle;
  var content = req.body.content;
  var newPost = await mongoose.registerPost({
    title: title,
    subtitle: subtitle,
    content: content
  });
  await newPost.save();
  res.redirect("/homepage");
  console.log("Saved Successfully");
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
  let titles = post.find({}, titles.forEach(customer => {
    customer.title;
  })
  )
  
  console.log(titles);
  res.render("home", {
    title: "HomePage", action: "/homepage"
  })
})


module.exports = router;
