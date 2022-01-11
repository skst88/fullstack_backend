const router = require("express").Router();

const userRoutes = require("./user-routes");
const productRoutes = require("./product-routes");
const commentRoutes = require("./comment-routes");

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/comment", commentRoutes);
module.exports = router;
