const multer = require("multer");
const path = require("path");

// Ensure the uploads directory exists
const uploadDirectory = "public/uploads";

// Multer configuration
const storage = multer.diskStorage({
	// Destination folder
	destination: function (req, file, cb) {
		cb(null, uploadDirectory); // Save to public/uploads
	},
	// Generate a unique filename
	filename: function (req, file, cb) {
		// Use the original filename and append a unique timestamp
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const newFileName = `${path.parse(file.originalname).name}-${uniqueSuffix}${path.extname(
			file.originalname
		)}`;
		cb(null, newFileName);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg", "image/webp"];
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true); // Accept the file
	} else {
		cb(new Error("Only image files are allowed!"), false); // Reject the file
	}
};

// Multer middleware
const upload = multer({
	dest: uploadDirectory,
	storage,
	fileFilter, // Apply the file filter
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;
