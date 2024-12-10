import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthValue } from "../store/auth/authSlice";

const AlreadyLoggedIn = ({ children }) => {
	const auth = useSelector(selectAuthValue);

	if (auth?.user_type) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export default AlreadyLoggedIn;
