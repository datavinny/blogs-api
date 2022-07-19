const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '14d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

module.exports = generateToken;