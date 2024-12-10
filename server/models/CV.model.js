const { model, Schema } = require("mongoose");

const cvSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId, // Use ObjectId to reference another collection
			ref: "User",
			required: true,
		},
		profileImage: String,
		fname: {
			type: String,
			required: true,
		},
		designation: {
			type: String,
			required: true,
		},
		expectedSalary: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			required: true,
		},
		github: {
			type: String,
			required: true,
		},
		linkedIn: {
			type: String,
			required: true,
		},
		website: {
			type: String,
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		education: {
			type: [
				{
					type: Schema.Types.ObjectId, // Use ObjectId to reference another collection
					ref: "Education",
				},
			],
			validate: {
				validator: function (value) {
					return value.length > 0; // Ensure at least one entry exists
				},
				message: "At least one entry in 'education' is required.",
			},
		},
		technicalSkills: {
			type: String,
			required: true,
		},
		professionalExp: {
			type: [
				{
					type: Schema.Types.ObjectId, // Use ObjectId to reference another collection
					ref: "ProfessionalExperience",
				},
			],
			validate: {
				validator: function (value) {
					return value.length > 0; // Ensure at least one entry exists
				},
				message: "At least one entry in 'professional experience' is required.",
			},
		},
		portfolio: {
			type: String,
			required: true,
		},
		languages: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("CV", cvSchema);
