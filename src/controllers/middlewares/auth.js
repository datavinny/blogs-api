const jwt = require('jsonwebtoken');
const { User, Category } = require('../../database/models');

const isValueUndefined = (value) => {
  if (!value) return true;
  return false;
};

const loginValidations = async (email, password) => {
  if (isValueUndefined(email) || isValueUndefined(password)) {
    return { message: 'Some required fields are missing' };
  }
  const usuario = await User.findOne({ where: { email, password } });
  if (!usuario) {
    return { message: 'Invalid fields' };
  }
  const { id: userId } = usuario.dataValues;
  return { userId, email };
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const validations = await loginValidations(email, password);
  if (validations && validations.message) {
    return res.status(400).json(validations);
  }
  req.user = validations;
  next();
};

const verifyCategory = async (categoryIds) => {
  const isCategoryIdValid = await Promise.all(categoryIds.map(async (e) => {
    const rawCategoryIds = await Category.findOne({ where: { id: e } });
    if (rawCategoryIds) {
      const data = rawCategoryIds.dataValues.id;
      return data;
    }
    return undefined;
  }));
  const arrResults = isCategoryIdValid.map((e, i) => {
    if (!e || (!e && i === isCategoryIdValid.length - 1)) {
      return { message: '"categoryIds" not found' };
    }
    return { pass: 'pass' };
  });
  return arrResults.find((e) => e.message);
};

const postValidations = async (title, content, categoryIds) => {
  if (isValueUndefined(title) || isValueUndefined(content) || isValueUndefined(categoryIds)) {
    return { message: 'Some required fields are missing' };
  }
  if (await verifyCategory(categoryIds)) {
    return { message: '"categoryIds" not found' };
  }
  return {};
};

const post = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const validations = await postValidations(title, content, categoryIds);
  if (validations && validations.message) {
    return res.status(400).json(validations);
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
    const user = decoded.data;
    req.user = user;
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
  post,
};