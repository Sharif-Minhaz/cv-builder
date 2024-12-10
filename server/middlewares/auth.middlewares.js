const jwt = require("jsonwebtoken");
const { throwError } = require("../libs/throwError");
const JWT_SECRET = process.env.JWT_SECRET;

const checkAuth = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	// get token from cookies or auth header
	const token = (authHeader && authHeader.split(" ")[1]) || req.cookies?.auth;

	// check if token is missing
	if (!token) throwError("Token is missing", 400);

	// verify token
	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		// check if token is invalid
		if (err) {
			console.error(err);
			throwError("Invalid token, verification failed", 403);
		}

		// Store decoded token payload in request object
		req.user = decoded;
		next();
	});
};

const checkAdmin = (req, res, next) => {
	const user = req.user;

	// check if user is authenticated
	if (!user) {
		throwError("Not an authenticated user", 403); // Unauthorized
	}

	// check if user is admin
	if (user.user_type === "admin") {
		next();
	} else {
		// user is not admin
		throwError("User is not an admin", 403);
	}
};

const checkGuest = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	// get token from cookies or auth header
	const token = (authHeader && authHeader.split(" ")[1]) || req.cookies?.auth;

	// check if token is missing, then allow user to access
	if (!token) {
		return next();
	} else {
		throwError("User is already authenticated", 403);
	}
};

module.exports = { checkAuth, checkAdmin, checkGuest };
