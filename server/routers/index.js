const cvHandler = require("./cv.routes");

const routes = [
	{
		path: "cv",
		handler: cvHandler,
	},
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(`/api/v1/${route.path}`, route.handler);
	});
};
