const { Op } = require("sequelize");
const { Product } = require("./../models");

const create = async (title, description, price, image, tag, userId) => {
  const product = await Product.create({
    title,
    description,
    price,
    image,
    tag,
    userId,
  });
  return product;
};

const getAll = async ({ q, offset, limit, tag }) => {
  if (q || tag) {
    if (!q) q = "";
    if (tag) {
      return await Product.findAndCountAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
          tag,
        },
        limit,
        offset,
      });
    } else {
      return await Product.findAndCountAll({
        where: {
          title: {
            [Op.iLike]: "%" + q + "%",
          },
        },
        limit,
        offset,
      });
    }
  }

  return await Product.findAndCountAll({
    limit,
    offset,
  });
};

const deleteOne = async (id) => {
  return await Product.destroy({ where: { id } });
};
const update = async (id, title, description, price, image, tag) => {
  return await Product.update(
    { title, description, price, image, tag },
    { where: { id } }
  );
  //   return await Product.patch({ where: { id } });
};
const getOne = async (id) => {
  const card = await Product.findOne({
    where: { id },
  });
  console.log(card);
  return card.dataValues;
};
module.exports = {
  create,
  deleteOne,
  update,
  getOne,
  getAll,
};
