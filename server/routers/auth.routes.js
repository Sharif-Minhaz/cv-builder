const { catchAsync } = require("../libs/catchAsync");
const router = require("express").Router();
const {
	signupController,
	loginController,
	logoutController,
	getCurrentUserController,
} = require("../controllers/auth.controllers");
const { checkAuth, checkGuest } = require("../middlewares/auth.middlewares");

router.get("/current", catchAsync(checkAuth), catchAsync(getCurrentUserController));
router.post("/signup", catchAsync(checkGuest), catchAsync(signupController));
router.post("/login", catchAsync(checkGuest), catchAsync(loginController));
router.post("/logout", catchAsync(checkAuth), catchAsync(logoutController));

module.exports = router;
