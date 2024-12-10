const fs = require("fs");
const path = require("path");
const CV = require("../models/CV.model");

exports.uploadImage = async (req, res) => {
	const filename = req.file?.filename;

	// check if image is provided
	if (!filename) {
		return res.status(400).json({
			success: false,
			message: "Image is required",
		});
	}

	res.status(201).json({
		success: true,
		message: `Image uploaded successfully: ${filename}`,
		data: { filename },
	});
};

exports.deleteImage = async (req, res) => {
	const imageUrl = req.params?.image_url;
	const user = req.user;

	// check if image url is provided
	if (!imageUrl) {
		return res.status(400).json({
			success: false,
			message: "Image url is required",
		});
	}

	// choose image path
	const filePath = path.join(__dirname, "..", "public", "uploads", imageUrl);

	// delete image with file path
	fs.unlinkSync(filePath);

	// delete image from CV
	await CV.findOneAndUpdate(
		{ userId: user._id, profileImage: imageUrl },
		{
			$unset: {
				profileImage: "",
			},
		}
	);

	res.status(200).json({
		success: true,
		message: `Image deleted successfully`,
	});
};
