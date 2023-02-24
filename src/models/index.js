'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const wishListModel = require('./wishlist/model.js');
const foodModel = require('./food/model.js');
const Collection = require('./data-collection.js');

const userModel = require('../auth/models/users');

//const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory' 
  : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);
const wishlist = wishListModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

//users: userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  wishlist: new Collection(wishlist),
  users,
};
