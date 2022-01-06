const ErrorHandler = require("./../utils/error-handler");
const { User } = require("./../models");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
  NOT_FOUND,
} = require("../utils/consts");

const { generateTokens, validateRefreshToken } = require("../utils/tokens");
const { sendActivationMail } = require("./mail-service");

const signup = async (email, password, firstName, lastName, role) => {
  const oldUser = await User.findOne({ where: { email } });

  if (oldUser) {
    throw ErrorHandler.BadRequest(USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, 3);
  const activationLink = uuid();
  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role,
    activationLink,
  });
  sendActivationMail(
    email,
    `${process.env.API}/api/user/activate/${activationLink}`
  );
  const tokens = generateTokens({ id: user.id, email, role });
  return tokens;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw ErrorHandler.BadRequest(USER_NOT_FOUND);
  }

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    throw ErrorHandler.BadRequest(WRONG_CREDENTIALS);
  }

  const tokens = generateTokens({ id: user.id, email, role: user.role });
  return tokens;
};

const activate = async (link) => {
  const user = await User.findOne({ where: { activationLink: link } });
  if (!user) {
    throw ErrorHandler.BadRequest("Activation link is incrorrect");
  }

  user.isActivated = true;
  await user.save();
};

const refresh = async (token) => {
  if (!token) throw ErrorHandler.UnauthorizedError();

  const userData = validateRefreshToken(token);

  if (!userData) throw ErrorHandler.UnauthorizedError();

  const user = await User.findOne({ where: { id: userData.id } });

  if (!user) throw ErrorHandler.BadRequest("user" + NOT_FOUND);
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return tokens;
};

const statuses = {
  active: async () => {
    return await User.findAll({ where: { isActivated: true } });
  },
  inactive: async () => {
    return await User.findAll({ where: { isActivated: false } });
  },
  default: async () => await User.findAll(),
};

const getAll = async (status) => {
  return statuses[status] ? statuses[status]() : statuses["default"]();
};

module.exports = {
  signup,
  login,
  activate,
  getAll,
  refresh,
};
