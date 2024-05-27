const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (token) {
    if (!token) {
      return null;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data;
    } catch {
      console.log('Invalid token');
      return null;
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
