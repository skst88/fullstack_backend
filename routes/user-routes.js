const router = require("express").Router();

const UserController = require("../controllers/user-controller");
const auth = require("../middlewares/auth-middleware");
const { checkRole } = require("../middlewares/check-role");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/", UserController.getAll);
router.get("/activate/:link", UserController.activate);
router.post("/refresh", UserController.refresh);

module.exports = router;
