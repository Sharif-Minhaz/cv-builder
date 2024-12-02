exports.errorHandler = async (err, req, res, _next) => {
	const statusCode = err.status || 500;

	res.json({
		statusCode,
		success: false,
		message: err.message || "Internal server error",
		stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
	});
};
