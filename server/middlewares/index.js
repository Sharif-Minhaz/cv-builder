const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: "Too many request, Try again after sometimes.",
});

const middlewares = [
	helmet(),
	cors({
		credentials: true,
		origin: ["http://localhost:5173", "http://localhost:5174"],
	}),
	cookieParser(),
	express.json(),
	express.urlencoded({ extended: true }),
	morgan("dev"),
	limiter,
	xssClean(),
];

module.exports = (app) => {
	app.use(middlewares);

	app.use(
		"/uploads",
		express.static(path.join(__dirname, "..", "public", "uploads"), {
			setHeaders: (res) => {
				res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
			},
		})
	);
};
