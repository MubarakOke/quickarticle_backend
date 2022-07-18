'use strict';
const { Model } = require('sequelize');
const bcrypt= require('bcryptjs')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Article, {foreignKey:'userId', as:'articles'})
    }
    
    async checkPassword(candidatePassword, userPassword) {
      return await bcrypt.compare(candidatePassword, userPassword);
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Please enter value for first name"},
        notEmpty: {msg: "First name field must not be empty"}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Please enter value for last name"},
        notEmpty: {msg: ":Last name field must not be empty"}
      }
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "Please enter value for email"},
        notEmpty: {msg: ":email field must not be empty"},
        isEmail: {msg: ":Please enter a valid email"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    scopes: {
      hidePassword: {
      attributes: { exclude: ['password'] },
      }
    },
    hooks: {
      beforeSave: async (user, options) => {
        if (!user.changed('password')) return
        user.password= await bcrypt.hash(user.password, 12) 
      }
    },
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  
  return User;
};