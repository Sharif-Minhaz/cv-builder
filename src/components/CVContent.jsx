import { useSelector } from "react-redux";

export default function CVContent() {
	const cv = useSelector((state) => state.cv.cv);

	console.log("info:", `${cv}`);

	return <section></section>;
}
