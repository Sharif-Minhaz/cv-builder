const { model, Schema } = require("mongoose");

const educationSchema = new Schema(
	{
		orgName: { type: String, required: true },
		duration: { type: String, required: true },
		title: { type: String, required: true },
		grade: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Education = model("Education", educationSchema);

module.exports = Education;
