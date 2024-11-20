import { useSelector } from "react-redux";
import { selectCvValue } from "../features/cv/cvSlice";
import { Image } from "@mantine/core";

export default function CVContent() {
	const cv = useSelector(selectCvValue);

	console.log(cv);

	return (
		<section>
			<Image src={cv.profileImage} alt="CV profile" />
		</section>
	);
}
