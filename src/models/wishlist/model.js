'use strict';

const wishListModel = (sequelize, DataTypes) => sequelize.define('wishlist', {
  product: { type: DataTypes.STRING, required: true },
  qty: { type: DataTypes.INTEGER, required: true },
  price: { type: DataTypes.INTEGER, required: true },
  priority: {type: DataTypes.ENUM('low', 'medium', 'high', 'highest')},
  userId: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = wishListModel;
