const ProfessionalExperience = require("../models/ProfessionalExperience.model");
const Education = require("../models/Education.model");

exports.addOrganizations = async (body) => {
	const { education, professionalExp } = body;

	// check if at least one entry in 'education' and 'professionalExp' is provided
	if (!education.length || !professionalExp.length) {
		return res.status(400).json({
			success: false,
			message: "At least one entry in 'education' and 'professionalExp' is required.",
		});
	}

	// save education and professional experience
	const [educationInfo, professionalExpInfo] = await Promise.all([
		Education.insertMany(education),
		ProfessionalExperience.insertMany(professionalExp),
	]);

	return {
		educationInfo,
		professionalExpInfo,
	};
};

exports.updateOrganizations = async (body, educationIds, professionalExpIds) => {
	const { education, professionalExp } = body;

	// check if at least one entry in 'education' and 'professionalExp' is provided
	if (!education.length || !professionalExp.length) {
		return res.status(400).json({
			success: false,
			message: "At least one entry in 'education' and 'professionalExp' is required.",
		});
	}

	// update education and professional experience
	const [educationInfo, professionalExpInfo] = await Promise.all([
		Education.updateMany({}, { $set: { ...education } }),
		ProfessionalExperience.updateMany({}, { $set: { ...professionalExp } }),
	]);

	return {
		educationInfo,
		professionalExpInfo,
	};
};
