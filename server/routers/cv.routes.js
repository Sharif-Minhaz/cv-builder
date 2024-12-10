const router = require("express").Router();
const {
	getAllCVInfo,
	getSingleCVInfo,
	createCV,
	updateCV,
	deleteCV,
	getUserCV,
} = require("../controllers/cv.controllers");
const { catchAsync } = require("../libs/catchAsync");
const { checkAuth, checkAdmin } = require("../middlewares/auth.middlewares");
const { runValidation } = require("../validators");
const { validateNewCV } = require("../validators/cv.validators");

router.get("/", catchAsync(checkAuth), catchAsync(checkAdmin), catchAsync(getAllCVInfo));
router.get("/view/:id", catchAsync(checkAuth), catchAsync(checkAdmin), catchAsync(getSingleCVInfo));
router.get("/user", catchAsync(checkAuth), catchAsync(getUserCV));

router.post("/", validateNewCV, runValidation, catchAsync(checkAuth), catchAsync(createCV));
router.patch("/", validateNewCV, runValidation, catchAsync(checkAuth), catchAsync(updateCV));

router.delete("/:userId", catchAsync(checkAuth), catchAsync(deleteCV));

module.exports = router;
