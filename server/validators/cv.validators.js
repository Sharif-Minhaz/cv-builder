const { body } = require("express-validator");

const validateNewCV = [
	// Validate 'user'
	body("userId").trim().notEmpty().withMessage("User id is required"),

	// Validate 'profileImage'
	body("profileImage").trim().notEmpty().withMessage("Profile image is required"),

	// Validate 'fname'
	body("fname").trim().notEmpty().withMessage("First name is required"),

	// Validate 'designation'
	body("designation").trim().notEmpty().withMessage("Designation is required"),

	// Validate 'email'
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email address"),

	// Validate 'mobile'
	body("mobile").trim().notEmpty().withMessage("Mobile number is required"),
	// Validate 'github'
	body("github").trim().notEmpty().withMessage("GitHub profile is required"),

	// Validate 'linkedIn'
	body("linkedIn").trim().notEmpty().withMessage("LinkedIn profile is required"),

	// Validate 'website'
	body("website").trim().notEmpty().withMessage("Website is required"),

	// Validate 'summary'
	body("summary").trim().notEmpty().withMessage("Summary is required"),

	// Validate 'education' (at least one entry is required)
	body("education")
		.isArray({ min: 1 })
		.withMessage("At least one education entry is required")
		.custom((education) => {
			return education.every((edu) => edu.orgName && edu.duration && edu.title && edu.grade);
		})
		.withMessage("Each education entry must have 'orgName', 'duration', 'title', and 'grade'"),

	// Validate 'technicalSkills'
	body("technicalSkills").trim().notEmpty().withMessage("Technical skills are required"),

	// Validate 'professionalExp' (at least one entry is required)
	body("professionalExp")
		.isArray({ min: 1 })
		.withMessage("At least one professional experience entry is required")
		.custom((experiences) => {
			return experiences.every(
				(exp) => exp.orgName && exp.duration && exp.designation && exp.role
			);
		})
		.withMessage(
			"Each professional experience entry must have 'orgName', 'duration', 'designation', and 'role'"
		),

	// Validate 'portfolio'
	body("portfolio").trim().notEmpty().withMessage("Portfolio is required"),

	// Validate 'languages'
	body("languages").trim().notEmpty().withMessage("Languages are required"),
];

module.exports = { validateNewCV };
