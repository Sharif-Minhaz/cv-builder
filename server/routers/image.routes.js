const router = require("express").Router();
const { uploadImage, deleteImage } = require("../controllers/image.controller");
const { catchAsync } = require("../libs/catchAsync");
const { checkAuth } = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/upload.middleware");

router.post(
	"/",
	catchAsync(upload.single("profileImage")),
	catchAsync(checkAuth),
	catchAsync(uploadImage)
);
router.delete("/:image_url", catchAsync(checkAuth), catchAsync(deleteImage));

module.exports = router;
