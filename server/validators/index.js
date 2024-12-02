const { validationResult } = require("express-validator");

const runValidation = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: "Input validation failed",
			errors: errors.array(),
		});
	}

	next();
};

module.exports = { runValidation };
