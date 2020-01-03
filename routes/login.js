/**
 * login routing
 */

const express = require("express");
const enrollUser = require("../db/enrollUser.js");
const enrollSession = require("../sessions/enrollSession.js");
const router = express.Router();

/**
 * send login result by Checking Database
 */
const login = (req, res, next) => {
  const user = enrollUser.getUserById(req.body.userid);
  let result;
  if (user) {
    if (user.password === req.body.password) {
      const sessionId = enrollSession.generateSessionID();
      enrollSession.addSession(sessionId, user.id, user.name);

      res.cookie("loginSession", sessionId);
      result = { result: "success", name: user.name };
    } else {
      result = { result: "fail" };
    }
  } else {
    result = { result: "fail" };
  }
  res.send(JSON.stringify(result));
};

router.post("/", login);

/**
 * Check is session id include session database
 */
const checkCookie = (req, res, next) => {
  const session = enrollSession.findSession(req.cookies.loginSession);
  if (session) {
    req.isLogin = true;
    req.name = session.userInfo.name;
  } else {
    req.isLogin = false;
  }
  next();
};

router.get("/", checkCookie, function(req, res, next) {
  let result = {};
  if (req.isLogin) {
    result = {
      result: "find",
      name: req.name
    };
  } else {
    result = {
      result: "none"
    };
  }
  res.send(JSON.stringify(result));
});

router.get("/expire", function(req, res, next) {
  if (enrollSession.deleteSession(req.cookies.loginSession)) {
    res.send(JSON.stringify({ result: "success" }));
  }
});

module.exports = router;
