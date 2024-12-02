const { model, Schema } = require("mongoose");

const educationSchema = new Schema({
	orgName: { type: String, required: true },
	duration: { type: String, required: true },
	title: { type: String, required: true },
	grade: { type: Number, required: true },
});

const professionalExpSchema = new Schema({
	orgName: { type: String, required: true },
	duration: { type: String, required: true },
	designation: { type: String, required: true },
	role: { type: String, required: true },
});

const cvSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		profileImage: {
			type: String,
			required: true,
		},
		fname: {
			type: String,
			required: true,
		},
		designation: {
			type: String,
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
			type: [educationSchema],
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
			type: [professionalExpSchema],
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
