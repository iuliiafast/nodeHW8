import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Book;