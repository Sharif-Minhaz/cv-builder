import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "../templates/Root";
import CVFormPage from "../pages/CVFormPage";
import CVPreviewPage from "../pages/CVPreviewPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ContentRoot from "../templates/ContentRoot";
import AuthRoot from "../templates/AuthRoot";
import Authenticated from "./Authenticated";
import AlreadyLoggedIn from "./AlreadyLoggedIn";
import ThemePage from "../pages/ThemePage";

export const routers = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route element={<ContentRoot />}>
				<Route
					index
					element={
						<Authenticated>
							<CVFormPage />
						</Authenticated>
					}
				/>
				<Route
					path="result"
					element={
						<Authenticated>
							<CVPreviewPage />
						</Authenticated>
					}
				/>
				<Route path="themes" element={<ThemePage />} />
			</Route>
			{/* Routes under EmptyRoot */}
			<Route path="auth" element={<AuthRoot />}>
				<Route
					path="login"
					element={
						<AlreadyLoggedIn>
							<LoginPage />
						</AlreadyLoggedIn>
					}
				/>
				<Route
					path="signup"
					element={
						<AlreadyLoggedIn>
							<SignupPage />
						</AlreadyLoggedIn>
					}
				/>
			</Route>
		</Route>
	)
);
