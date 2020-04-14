/**
 * signup routing (./enroll/)
 */

const express = require('express');
const router = express.Router();
const enrollUser = require('../db/users/enrollUser.js');

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.get('/user', (req, res, next) => {
  const isUserExist = (id) => (enrollUser.getUserById(id) ? false : true);
  const result = isUserExist(req.query.id);

  res.json({ result });
});

router.post('/', (req, res, next) => {
  if (enrollUser.addUser(req.body)) {
    res.json({ result: 'success' });
  } else {
    res.json({ result: 'fail' });
  }
});

module.exports = router;
