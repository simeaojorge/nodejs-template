var express = require('express');
var bodyParser = require("body-parser");
var app = express();
require('dotenv').config()

var session = require('express-session')

var index = require('./routes/index')
var user = require('./routes/user')

var sess = {
  secret: 'auto',
  saveUninitialized: true,
  resave: false
}

app.use(bodyParser.json());
app.use(session(sess))

app.use(index)
app.use(user)

let port = process.env.PORT || 3000
app.listen(port, async () => {
  console.log("Server listening on port "+port)
});
