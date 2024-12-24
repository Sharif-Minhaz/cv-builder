import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthValue } from "../store/auth/authSlice";

const Authenticated = ({ children }) => {
	const auth = useSelector(selectAuthValue);

	if (!auth?.user_type) {
		return <Navigate to="/auth/login" replace />;
	}
	return children;
};

export default Authenticated;
