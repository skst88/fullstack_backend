const ErrorHandler = require("../utils/error-handler");

const UserService = require("../services/user-service");

const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const userData = await UserService.signup(
      email,
      password,
      firstName,
      lastName
    );

    res.json(userData);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = await UserService.login(email, password);

    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const activate = async (req, res, next) => {
  try {
    const { link } = req.params;
    await UserService.activate(link);
    res.redirect("https://www.google.com");
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refresh_token } = req.headers;
    const userData = await UserService.refresh(refresh_token);
    res.json(userData);
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;

    const users = await UserService.getAll(status);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  getAll,
  activate,
  login,
  refresh,
};
