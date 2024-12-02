const router = require("express").Router();
const {
	getAllCVInfo,
	getSingleCVInfo,
	createCV,
	updateCV,
	deleteCV,
} = require("../controllers/cv.controllers");
const catchAsync = require("../libs/catchAsync");
const { runValidation } = require("../validators");
const { validateNewCV } = require("../validators/cv.validators");

router.get("/", catchAsync(getAllCVInfo));
router.get("/view/:id", catchAsync(getSingleCVInfo));

router.post("/", validateNewCV, runValidation, catchAsync(createCV));
router.patch("/", validateNewCV, runValidation, catchAsync(updateCV));

router.delete("/:userId", catchAsync(deleteCV));

module.exports = router;
