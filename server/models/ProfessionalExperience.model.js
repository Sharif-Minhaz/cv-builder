const { model, Schema } = require("mongoose");

const professionalExpSchema = new Schema(
	{
		orgName: { type: String, required: true },
		duration: { type: String, required: true },
		designation: { type: String, required: true },
		role: { type: String, required: true },
		currentlyWorking: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const ProfessionalExperience = model("ProfessionalExperience", professionalExpSchema);

module.exports = ProfessionalExperience;
