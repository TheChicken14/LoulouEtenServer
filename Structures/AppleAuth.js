const { createRemoteJWKSet } = require("jose/jwks/remote");
const { jwtVerify } = require("jose/jwt/verify");

const axios = require("axios");
const url = "https://appleid.apple.com/auth/keys";

// const { JWKS, JWT, errors } = jose;

module.exports = class AppleAuth {
  static verifyToken(token) {
    return new Promise(async (res, rej) => {
      const key = createRemoteJWKSet(new URL(url));

      try {
        const verified = await jwtVerify(token, key);
        if (verified) {
          res(verified);
        }
      } catch (e) {
        res(false);
      }
    });
  }
};
