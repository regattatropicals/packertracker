const express = require('express');

const pool = require('../utils/db');
const {
  verifyPassword, buildJWT, isValidJWT,
} = require('../utils/auth');
const {
  OK, CLIENT_ERROR, UNAUTHORIZED, SERVER_ERROR,
} = require('../utils/status');

const router = express.Router();

router.post('/', async(req, res) => {
  /* If the login request already has a valid JWT attached to it,
   * redirect to the app page.
   */
  if (await isValidJWT(req.cookies.access_token)) {
    return res.sendStatus(OK);
  }

  let username;
  let password;

  try {
    username = req.body.username;
    password = req.body.password;
  } catch (err) {
    /* The login request was malformed, so return a client error. */
    console.error(err);
    return res.sendStatus(CLIENT_ERROR);
  }
  try {
    const credentialLookup = (await pool.query(`
            SELECT employee_id, salt, salted_hash, is_admin, is_raspi FROM Credentials
            WHERE username = ?
        `,
    [
      username,
    ]))[0];

    if (credentialLookup.length === 0) {
      /* Username is not stored in the DB, so authorization fails.*/
      return res.sendStatus(UNAUTHORIZED);
    }

    const employeeId = credentialLookup[0].employee_id;
    const salt = credentialLookup[0].salt;
    const saltedHash = credentialLookup[0].salted_hash;
    const isAdmin = credentialLookup[0].is_admin;
    const isRaspi = credentialLookup[0].is_raspi;

    const loginResult = await verifyPassword(password, salt, saltedHash);

    if (loginResult) {
      const employeeLookup = await pool.query(`
                SELECT employee_firstname, employee_lastname
                FROM Employee
                WHERE employee_id = ?
            `,
      [
        employeeId,
      ]);

      const firstName = employeeLookup[0].employee_firstname;
      const lastName = employeeLookup[0].employee_lastname;

      const managerLookup = await pool.query(`
                SELECT manager_id
                FROM Manager
                WHERE employee_id = ?
            `,
      [
        employeeId,
      ]);

      const permissions = [];

      if (isAdmin) {
        permissions.push('admin');
      }
      if (isRaspi) {
        permissions.push('raspi');
      }
      if (managerLookup.length === 1) {
        permissions.push('manager');
      }

      const payload = {
        'employeeId': employeeId,
        'firstName': firstName,
        'lastName': lastName,
        'permissions': permissions,
      };

      const jwtExpiration = isRaspi
        ? null
        : 60 * 60 * 16;
      const jwt = await buildJWT(payload, jwtExpiration);

      return res.clearCookie('access_token').cookie('access_token', jwt, {
        'httpOnly': true,
        'secure': true,
      })
        .redirect('/');
    } else {
      return res.clearCookie('access_token').sendStatus(UNAUTHORIZED);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(SERVER_ERROR);
  }
});

module.exports = router;
