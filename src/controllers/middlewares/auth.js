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
  .then((data) => data).catch((e) => console.log(e.message));
  console.log('isUserOnDB', isUserOnDB);
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
  const regexValidEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (regexValidEmail.test(email)) {
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
  .then((data) => data).catch((e) => console.log(e.message));
  if (!isUserOnDB) {
    return false;
  }
  return true;
};

const createUserBody = (req, res, next) => {
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
    case isEmailOnDB(email):
      return res.status(401).json({ message: 'User already registered' });
    default:
      next();
  }
};

module.exports = {
  login,
  createUserBody,
};