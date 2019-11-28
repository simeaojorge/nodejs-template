var express = require('express');
var functions = require("../app/function")
var router = express.Router();


// GET home page.
router.get('/', function(req, res) {
    res.send('NOT IMPLEMENTED'); 
});

module.exports = router