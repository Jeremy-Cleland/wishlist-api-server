'use strict';

const purchaseModel = (sequelize, DataTypes) => sequelize.define('purchase', {
  product: { type: DataTypes.STRING, required: true },
  qty: { type: DataTypes.INTEGER, required: true },
  price: { type: DataTypes.INTEGER, required: true },
  userId: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = purchaseModel;
