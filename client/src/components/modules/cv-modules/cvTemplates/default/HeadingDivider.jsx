import { Divider } from "@mantine/core";

export default function HeadingDivider({ w = 350, mt = -15, mb = 14, mx }) {
	return (
		<Divider className="heading-divider" w={w} size="2px" mx={mx} mt={mt} mb={mb} c="#3d3d3d" />
	);
}
