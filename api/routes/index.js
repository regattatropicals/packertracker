const path = require('path');
const express = require('express');

const {
  isValidJWT,
} = require('../utils/auth');

const router = express.Router();

router.get('/', async(req, res) => {
  /* If the login request has a valid JWT attached to it,
   * send the app page. Otherwise, send the login page.
   */
  if (await isValidJWT(req.cookies.access_token)) {
    return res.sendFile(path.resolve('dist/index.html'));
  } else {
    return res.sendFile(path.resolve('dist/login.html'));
  }
});

module.exports = router;
