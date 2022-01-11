const ProductService = require("./../services/product-service");
const { CREATE_SUCCESS, DELETE_SUCCESS } = require("../utils/consts");

const create = async (req, res, next) => {
  try {
    const { title, description, price, image, tag } = req.body;
    const { id } = req.user;
    const { id: productId } = await ProductService.create(
      title,
      description,
      price,
      image,
      tag,
      id
    );
    res.json({ message: CREATE_SUCCESS, productId });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    let { q, page, limit, tag } = req.query;
    page = page || 1;
    limit = limit || 3;
    const offset = page * limit - limit;
    const product = await ProductService.getAll({ offset, limit, q, tag });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Tag not found" });
  }
};
const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getOne(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "qwe not found" });
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.deleteOne(id);
    res.json({ message: DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { title, description, price, image, tag } = req.body;

    const { id } = req.params;
    await ProductService.update(id, title, description, price, image, tag);
    res.json({ message: DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  update,
};
