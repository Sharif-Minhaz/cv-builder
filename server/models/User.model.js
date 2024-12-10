const { model, Schema } = require("mongoose");

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		username: { type: String, required: true },
		user_type: { type: String, default: "client", enum: ["client", "admin"] },
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = User;
