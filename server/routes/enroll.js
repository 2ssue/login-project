const express = require('express');
const router = express.Router();
const enrollUser = require('../db/enrollUser.js');

router.get('/', function(req, res, next){
    res.redirect('/');
})

router.get('/user', function(req, res, next){
    const result = enrollUser.getUserById(req.query.id) ? false : true;
    res.send(result);
})

router.post('/', function(req, res, next){
    if(enrollUser.addUser(req.body)){
        res.send(JSON.stringify({result: 'success'}));
    }else{
        res.send(JSON.stringify({result: 'fail'}));
    }
})

module.exports = router;