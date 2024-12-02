const CV = require("../models/CV.model");

/**
 * @api {get} /cv Get all CV Info
 * @apiName Get all CV Info
 * @apiGroup CV
 *
 * @apiSuccess {Boolean} success If the request is successfully processed.
 * @apiSuccess {Object[]} data Array of CV objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": [...]
 *     }
 */
exports.getAllCVInfo = async (req, res) => {
	const cv = await CV.find().lean();

	res.status(200).json({
		success: true,
		data: cv,
	});
};

/**
 * @api {get} /cv/:id Get a single CV Info
 * @apiName Get a single CV Info
 * @apiGroup CV
 *
 * @apiParam {String} id Unique identifier of the CV.
 *
 * @apiSuccess {Boolean} success If the request is successfully processed.
 * @apiSuccess {Object} data CV object.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {...}
 *     }
 *
 * @apiError CVNotFound CV not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *       "message": "CV not found"
 *     }
 */
exports.getSingleCVInfo = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({
			success: false,
			message: "Id is required",
		});
	}

	const cv = await CV.findById(id).lean();

	if (!cv) {
		return res.status(404).json({
			success: false,
			message: "CV not found",
		});
	}

	res.status(200).json({
		success: true,
		data: cv,
	});
};

/**
 * @api {post} /cv Create a new CV
 * @apiName CreateCV
 * @apiGroup CV
 *
 * @apiParam {String} user User identifier.
 * @apiParam {String} profileImage Profile image URL.
 * @apiParam {String} fname First name.
 * @apiParam {String} designation Job designation.
 * @apiParam {String} email Email address.
 * @apiParam {String} mobile Mobile number.
 * @apiParam {String} github GitHub profile URL.
 * @apiParam {String} linkedIn LinkedIn profile URL.
 * @apiParam {String} website Personal website URL.
 * @apiParam {String} summary Professional summary.
 * @apiParam {Object[]} education Array of education entries.
 * @apiParam {String} technicalSkills Technical skills.
 * @apiParam {Object[]} professionalExp Array of professional experience entries.
 * @apiParam {String} portfolio Portfolio URL.
 * @apiParam {String} languages Known languages.
 *
 * @apiSuccess {Boolean} success If the request is successfully processed.
 * @apiSuccess {Object} data Created CV object.
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "success": true,
 *       "data": {...},
 *       "message": "CV created successfully"
 *     }
 */
exports.createCV = async (req, res) => {
	const newCV = await CV.create(req.body);

	res.status(201).json({
		success: true,
		data: newCV,
		message: "CV created successfully",
	});
};

exports.updateCV = async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({
			success: false,
			message: "userId is required",
		});
	}

	const updatedCV = await CV.findOneAndUpdate({ userId }, req.body, {
		new: true,
	});

	if (!updatedCV) {
		return res.status(404).json({
			success: false,
			message: "CV not found",
		});
	}

	res.status(200).json({
		success: true,
		data: updatedCV,
		message: "CV updated successfully",
	});
};

exports.deleteCV = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return res.status(400).json({
			success: false,
			message: "UserId is required",
		});
	}

	const deletedCV = await CV.findOneAndDelete({ userId });

	if (!deletedCV) {
		return res.status(404).json({
			success: false,
			message: "CV not found",
		});
	}

	res.status(200).json({
		success: true,
		data: deletedCV,
		message: "CV deleted successfully",
	});
};
