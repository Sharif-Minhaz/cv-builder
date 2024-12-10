const cvHandler = require("./cv.routes");
const authHandler = require("./auth.routes");
const imageHandler = require("./image.routes");

const routes = [
	{
		path: "cv",
		handler: cvHandler,
	},
	{
		path: "auth",
		handler: authHandler,
	},
	{
		path: "image",
		handler: imageHandler,
	},
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(`/api/v1/${route.path}`, route.handler);
	});
};
