var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout');
});

router.get('/login', function(req, res, next) {
  res.render('layout');
});

router.get('/signup', function(req, res, next) {
  res.render('layout');
});

router.get('/main', function(req, res, next) {
  res.render('layout', {
      titie: '로그인 성공',
      content: `${req.body.name}님 반갑습니다`,
      footer1: 'unshow',
      footer2: 'unshow',
      footer3: 'show'
  });
});

module.exports = router;
