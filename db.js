const mongoose = require('mongoose')
const schema = mongoose.Schema;
require('dotenv').config();


//DB conection configuration
const uri = process.env.DATABASE_URL;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "Connection error: "));
connection.once("Open", () => {
    console.log("Connection Successfuly");
});


const postSchema = new schema({
    title: String,
    subtitle: String,
    content: String,
    date: String,
    count: {type: Number, default:0}
}, {collection: "posts"});

const registerPost = mongoose.model("registerPost", postSchema);

const userSchema = new schema({
    email: String,
    password: String
}, {collection: "users"});

const registerUser = mongoose.model("registerUser", userSchema);

module.exports = {registerPost, registerUser}


