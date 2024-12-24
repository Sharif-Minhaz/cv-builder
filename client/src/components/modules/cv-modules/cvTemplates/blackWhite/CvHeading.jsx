import { Box, Text } from "@mantine/core";

export default function CvHeading({ mt = 40, heading, py = 18, px = 20, ta = "center", style }) {
	return (
		<Box
			mt={mt}
			bg="#f5f5f5"
			tt="uppercase"
			py={py}
			px={px}
			component="h2"
			ta={ta}
			style={style}
		>
			<Text fw="bold" size="20px" lts={2} c={"#2e2e2e"}>
				{heading}
			</Text>
		</Box>
	);
}
