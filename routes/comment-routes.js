const router = require("express").Router();
const auth = require("../middlewares/auth-middleware");
const checkPermission = require("../middlewares/check-permission");
const { checkRole } = require("../middlewares/check-role");
const { Comment } = require("../models");
const CommentController = require("./../controllers/comment-controller");

router.post("/create", auth, CommentController.create);
router.get("/:id", CommentController.getAll);
router.patch(
  "/:id",
  auth,
  checkRole("ADMIN", "USER"),
  checkPermission(Comment),
  CommentController.update
);
router.delete(
  "/:id",
  auth,
  checkRole("ADMIN", "USER"),
  checkPermission(Comment),
  CommentController.deleteOne
);
router.get("/get/:id", CommentController.getOne);

module.exports = router;
