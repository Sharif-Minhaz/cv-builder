import { Box, Text } from "@mantine/core";

export default function CvHeading({ heading, ta, style }) {
	return (
		<Box tt="uppercase" component="h2" ta={ta} style={style}>
			<Text fw="bold" size="16px">
				{heading}
			</Text>
		</Box>
	);
}
