const scrypt = require('scrypt');
const jwt = require('jsonwebtoken');

const JWTSEC = process.env.JWTSEC;

const verifyPassword = function verifyPassword(password, salt, saltedHash) {
  const saltedPassword = salt.toString('ascii') + password;

  return scrypt.verifyKdf(saltedHash, saltedPassword);
};

const buildJWT = function buildJWT(payload, expiration) {
  return new Promise((resolve, reject) => {
    const options = {};

    if (expiration) {
      options.expiresIn = expiration;
    }

    jwt.sign(payload, JWTSEC, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

const isValidJWT = function isValidJWT(token) {
  return new Promise((resolve) => {
    jwt.verify(token, JWTSEC, {}, (err) => {
      if (err) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

module.exports = {
  verifyPassword,
  buildJWT,
  isValidJWT,
};
