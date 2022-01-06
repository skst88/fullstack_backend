const auth = require("../middlewares/auth-middleware");
const checkPermission = require("../middlewares/check-permission");
const { checkRole } = require("../middlewares/check-role");
const { Product } = require("../models");
const ProductController = require("./../controllers/product-controller");
const router = require("express").Router();

router.post("/create", auth, ProductController.create);
router.delete(
  "/:id",
  auth,
  checkRole("ADMIN", "USER"),
  checkPermission(Product),
  ProductController.deleteOne
);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.patch("/:id", ProductController.update);
module.exports = router;
