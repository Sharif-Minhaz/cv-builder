import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUserQuery } from "./store/api/authSliceApi";
import { useViewUserCVQuery } from "./store/api/cvSliceApi";
import { setAuthData } from "./store/auth/authSlice";
import { addDataToStore } from "./store/cv/cvSlice";

function App() {
	const dispatch = useDispatch();
	const responseInfo = useCurrentUserQuery();
	const cvResponseInfo = useViewUserCVQuery();

	useEffect(() => {
		dispatch(setAuthData(responseInfo?.data?.data));
	}, [responseInfo, dispatch]);

	useEffect(() => {
		dispatch(addDataToStore(cvResponseInfo?.data?.data));
		localStorage.setItem("cv", JSON.stringify({ json: cvResponseInfo?.data?.data }));
	}, [cvResponseInfo, dispatch]);

	return <RouterProvider router={routers} />;
}

export default App;
