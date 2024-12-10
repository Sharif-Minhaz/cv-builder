const CV = require("../models/CV.model");
const Education = require("../models/Education.model");
const ProfessionalExp = require("../models/ProfessionalExperience.model");
const { addOrganizations } = require("../services/cv.services");

exports.getAllCVInfo = async (req, res) => {
	// find CV
	const cv = await CV.find()
		.populate({ path: "education", select: "-_id orgName duration title grade" })
		.populate({
			path: "professionalExp",
			select: "-_id orgName duration designation role",
		})
		.lean();

	res.status(200).json({
		success: true,
		data: cv,
	});
};

exports.getSingleCVInfo = async (req, res) => {
	const { id } = req.params;

	// check if id is provided
	if (!id) {
		return res.status(400).json({
			success: false,
			message: "Id is required",
		});
	}

	// find CV
	const cv = await CV.findById(id)
		.populate({ path: "education", select: "-_id orgName duration title grade" })
		.populate({
			path: "professionalExp",
			select: "-_id orgName duration designation role",
		})
		.lean();

	// check if CV is found
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

exports.createCV = async (req, res) => {
	const userId = req.user._id;

	// check if cv is already exist
	const isCVExist = await CV.exists({ userId });

	if (isCVExist) {
		return res.status(409).json({
			success: false,
			message: "CV already exist",
		});
	}

	// add organizations
	const { educationInfo, professionalExpInfo } = await addOrganizations(req.body);

	// create new CV
	const newCV = new CV({ ...req.body, userId: req.user._id });

	// add education and professional experience ids
	newCV.education = educationInfo.map((edu) => edu._id);
	newCV.professionalExp = professionalExpInfo.map((exp) => exp._id);

	// save CV
	const createdCV = await newCV.save();

	res.status(201).json({
		success: true,
		data: createdCV,
		message: "CV created successfully",
	});
};

exports.updateCV = async (req, res) => {
	const userId = req.user._id;

	if (!userId) {
		return res.status(400).json({
			success: false,
			message: "userId is required",
		});
	}

	// Fetch current CV
	const currentCV = await CV.findOne({ userId });

	if (!currentCV) {
		return res.status(404).json({
			success: false,
			message: "CV not found",
		});
	}

	// Add new organizations
	const { educationInfo, professionalExpInfo } = await addOrganizations(req.body);

	const newEducationIds = educationInfo.map((edu) => edu._id);
	const newProfessionalExpIds = professionalExpInfo.map((exp) => exp._id);

	// Delete existing `education` and `professionalExp` data
	await Promise.all([
		Education.deleteMany({ _id: { $in: currentCV.education } }),
		ProfessionalExp.deleteMany({ _id: { $in: currentCV.professionalExp } }),
	]);

	// Update CV with new data
	const updatedCV = await CV.findOneAndUpdate(
		{ userId },
		{ ...req.body, education: newEducationIds, professionalExp: newProfessionalExpIds },
		{ new: true }
	)
		.populate({ path: "education", select: "-_id orgName duration title grade" })
		.populate({
			path: "professionalExp",
			select: "-_id orgName duration designation role",
		});

	res.status(200).json({
		success: true,
		data: updatedCV,
		message: "CV updated successfully",
	});
};

exports.getUserCV = async (req, res) => {
	const userId = req.user._id;

	// find CV
	const cv = await CV.findOne({ userId })
		.populate({ path: "education", select: "-_id orgName duration title grade" })
		.populate({
			path: "professionalExp",
			select: "-_id orgName duration designation role",
		})
		.lean();

	// check if CV is found
	if (!cv) {
		return res.status(404).json({
			success: false,
			message: "CV not found",
			data: {},
		});
	}

	res.status(200).json({
		success: true,
		data: cv,
	});
};

exports.deleteCV = async (req, res) => {
	const { userId } = req.params;

	// check if userId is provided
	if (!userId) {
		return res.status(400).json({
			success: false,
			message: "UserId is required",
		});
	}

	// delete CV
	const deletedCV = await CV.findOneAndDelete({ userId });

	// remove CV from education and professional experience
	await CV.updateMany(
		{},
		{
			$pull: {
				education: deletedCV.education,
				professionalExp: deletedCV.professionalExp,
			},
		}
	);

	// check if CV is deleted
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
