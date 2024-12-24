require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db");
const { errorHandler } = require("./middlewares/error.middleware");
const setMiddlewares = require("./middlewares");
const setRoutes = require("./routers");
const path = require("path");

// set middlewares and routes
app.use(express.static(path.join(__dirname, "public"))); // serve static files
setMiddlewares(app);
setRoutes(app);

// using custom global error handler
app.use((_, res) => {
	res.status(404).json({
		success: false,
		message: "404 Page not found",
	});
});

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.info(`Server running at port: ${PORT}`);
		});
	})
	.catch((err) => console.error(err.message));
