const jwt = require("jsonwebtoken");
const { throwError } = require("./throwError");
const SECRET = process.env.JWT_SECRET;

exports.generateToken = function generateToken(user) {
	if (!user) throwError("No user information provided", 401);
	if (!SECRET) throwError("JWT_SECRET is not defined", 500);

	// generate jwt token
	const token = jwt.sign(
		{ _id: user._id, email: user.email, username: user.username, user_type: user.user_type },
		SECRET,
		{
			expiresIn: "6h",
		}
	);

	return token;
};

exports.verifyToken = function verifyToken(token) {
	if (!token) throwError("No token provided", 401);
	if (!SECRET) throwError("JWT_SECRET is not defined", 500);

	// decode jwt token
	const user = jwt.verify(token, SECRET);
	return user;
};
