const isValueUndefined = (value) => {
  if (!value) return true;
  return false;
};

const { User } = require('../../database/models');

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

module.exports = {
  login,
};