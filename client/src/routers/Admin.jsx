import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthValue } from "../store/auth/authSlice";

const Admin = ({ children }) => {
	const auth = useSelector(selectAuthValue);

	if (auth?.user_type !== "admin") {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default Admin;
