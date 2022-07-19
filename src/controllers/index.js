const createLogin = require('./createLogin');
const createUser = require('./createUser');
const createCategory = require('./createCategory');
const createPost = require('./createPost');

const getAllUsers = require('./getAllUsers');
const getUserById = require('./getUserById');
const getCategories = require('./getCategories');

module.exports = {
  createLogin,
  createUser,
  getAllUsers,
  getUserById,
  createCategory,
  getCategories,
  createPost,
};