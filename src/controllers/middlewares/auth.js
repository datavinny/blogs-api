const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');

const isValueUndefined = (value) => {
  if (!value) return true;
  return false;
};

const isFieldsValuesInvalid = async (email, password) => {
  if (isValueUndefined(email) || isValueUndefined(password)) {
    return { message: 'Some required fields are missing' };
  }
  const isUserOnDB = await User.findOne({ where: { email, password } })
  .then((data) => data).catch((e) => console.error(e.message));
  if (!isUserOnDB) {
    return { message: 'Invalid fields' };
  }
  return {};
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const FieldsValidation = await isFieldsValuesInvalid(email, password);
  if (FieldsValidation && FieldsValidation.message) {
    return res.status(400).json(FieldsValidation);
  }
  next();
};

const isDisplayNameTooShort = (displayName) => {
  if (displayName.length < 8) {
    return true;
  }
  return false;
};

const isEmailOnInvalidFormat = (email) => {
  const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!regex.test(email)) {
    return true;
  }
  return false;
};

const isPasswordTooShort = (password) => {
  if (password.length < 6) {
    return true;
  }
  return false;
};

const isEmailOnDB = async (email) => {
  const isUserOnDB = await User.findOne({ where: { email } })
  .then((data) => data).catch((e) => console.error(e.message));
  if (isUserOnDB === null) {
    return false;
  }
  return true;
};

const createUserBody = async (req, res, next) => {
  const { email, password, displayName } = req.body;
  switch (true) {
    case isDisplayNameTooShort(displayName):
      return (
        res.status(400).json({ message: '"displayName" length must be at least 8 characters long' })
      );
    case isEmailOnInvalidFormat(email):
      return res.status(400).json({ message: '"email" must be a valid email' });
    case isPasswordTooShort(password):
      return (
        res.status(400).json({ message: '"password" length must be at least 6 characters long' })
      );
    case await isEmailOnDB(email):
      return res.status(409).json({ message: 'User already registered' });
    default:
      next();
  }
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    console.log('*******************');
    console.log('decoded', decoded);
    console.log('*******************');
    // const user = await User.findOne({ where: { username: decoded.data.username } });
    // console.log('user', user);
    // if (!user) {
    //   return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    // }
    // O usuário existe! Colocamos ele em um campo no objeto req.
    //    Dessa forma, o usuário estará disponível para outros middlewares que
    //    executem em sequência 
    // req.user = user;
    next();
  } catch (e) {
      console.error(e);
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
  login,
  createUserBody,
  validateJWT,
};