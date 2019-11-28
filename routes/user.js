var express = require('express');
var router = express.Router();
var auth = require('../auth');

var userController = require('../controllers/user');

router.get('/user', auth, userController.get)

module.exports = router;