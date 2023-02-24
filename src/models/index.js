'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const wishListModel = require('./wishlist/model.js');
const purchaseModel = require('./purchase/model.js');
const Collection = require('./data-collection.js');

const userModel = require('../auth/models/users');

//const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory' 
  : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const purchase = purchaseModel(sequelize, DataTypes);
const wishlist = wishListModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

//users: userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  purchase: new Collection(purchase),
  wishlist: new Collection(wishlist),
  users,
};
