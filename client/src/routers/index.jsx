import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "../templates/Root";
import CVFormPage from "../pages/CVFormPage";
import CVPreviewPage from "../pages/CVPreviewPage";

export const routers = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<CVFormPage />} />
			<Route path="result" element={<CVPreviewPage />} />
		</Route>
	)
);
