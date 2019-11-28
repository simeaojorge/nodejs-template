'use strict';
// const { User, Company, UserRule, AccessRule, Actions, Media } = require('../models')
const jwt = require('jsonwebtoken')
var randomstring = require("randomstring")
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports.get = async (req, res) => {
    //functions.startTimer() -> Added to app.js
    try {
        let userId = req.session.userId

        var response = {
            "statusCode": 200,
            "body": responseObj
        }
        
        
        functions.sendResponse(res, response)

    }
    catch(e){
        
        functions.sendResponseException(res, e)
    }
}