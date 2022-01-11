const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  tag: {
    type: DataTypes.ENUM([
      "Greeting card",
      "Notebook",
      "Assorted card sets",
      "Wallpaper",
    ]),
  },
});

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  owner: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
});

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Product.hasMany(Comment);
Comment.belongsTo(Product);

module.exports = {
  User,
  Product,
  Comment,
};
