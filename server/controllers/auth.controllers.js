const { generateToken } = require("../libs/jwtHandler");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

exports.loginController = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+password");

	if (user) {
		const isMatched = await bcrypt.compare(password, user.password);

		// removed password field from user  object
		user.password = undefined;

		if (isMatched) {
			// generate json web token
			const token = generateToken(user);

			// set httpOnly auth cookie to browser
			res.cookie("auth", token, {
				maxAge: 6 * 60 * 60 * 1000, // 6 hour
				secure: process.env.NODE_ENV === "production" ? true : false,
				httpOnly: process.env.NODE_ENV === "production" ? true : false,
				sameSite: process.env.NODE_ENV === "production" ? "none" : false,
			});

			return res.status(200).json({
				success: true,
				message: "login successful",
				data: user,
				token,
			});
		}

		return res.status(401).json({
			success: false,
			message: "Credentials do not match",
		});
	}
	res.status(401).json({
		success: false,
		message: "Credentials do not match",
	});
};

exports.signupController = async (req, res) => {
	const { body } = req;

	const isUserExist = await User.exists({ email: body.email });

	// check if user already exist
	if (isUserExist)
		return res.status(409).json({
			success: false,
			message: "user already exist",
		});

	// hash password
	const hashedPassword = await bcrypt.hash(body.password, 12);

	// create new user
	const newUser = await User.create({ ...body, password: hashedPassword });

	// removed password field from user  object
	newUser.password = undefined;

	// check if user is created
	if (newUser) {
		return res.status(201).json({
			success: true,
			message: "registration successful",
			data: newUser,
		});
	}

	res.status(500).json({
		success: false,
		message: "registration failed",
	});
};

exports.getCurrentUserController = async (req, res) => {
	const user = await User.findById(req.user._id);

	// check if user is found
	if (!user) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	return res.status(200).json({
		success: true,
		data: user,
	});
};

exports.logoutController = async (req, res) => {
	// remove auth cookie
	res.cookie("auth", "", {
		maxAge: 0,
		secure: process.env.NODE_ENV === "production" ? true : false,
		httpOnly: process.env.NODE_ENV === "production" ? true : false,
		sameSite: process.env.NODE_ENV === "production" ? "none" : false,
	});

	res.status(200).json({
		success: true,
		message: "logout successful",
	});
};
