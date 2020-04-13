const express = require('express');
const enrollUser = require('../db/users/enrollUser.js');
const enrollSession = require('../db/sessions/enrollSession.js');
const router = express.Router();

router.post('/', login).get('/', checkSessionExist, (req, res, next) => {
  if (!req.isLogin) {
    res.json({ result: 'none' });
    return;
  }

  res.json({
    result: 'find',
    name: req.name,
  });
});

router.get('/expire', (req, res, next) => {
  if (enrollSession.deleteSession(req.cookies.loginSession)) {
    res.json({ result: 'success' });
  }
});

/**
 * send login result by Checking Database
 */
function login(req, res, next) {
  const user = enrollUser.getUserById(req.body.userid);

  if (!user || user.password !== req.body.password) {
    res.json({ result: 'fail' });
    return;
  }

  const sessionId = enrollSession.generateSessionID();
  enrollSession.addSession(sessionId, user.id, user.name);

  res.cookie('loginSession', sessionId);
  res.json({ result: 'success', name: user.name });
}

/**
 * Check is session id include session database
 */
function checkSessionExist(req, res, next) {
  const session = enrollSession.findSession(req.cookies.loginSession);
  if (session) {
    req.isLogin = true;
    req.name = session.userInfo.name;
  } else {
    req.isLogin = false;
  }
  next();
}

module.exports = router;
