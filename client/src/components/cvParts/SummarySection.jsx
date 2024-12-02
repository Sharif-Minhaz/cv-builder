import { Box, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";

export default function SummarySection({ details }) {
	return (
		<Box component="section" px={20}>
			<CvHeading heading="Summary" ta="center" />
			<HeadingDivider w={300} mx="auto" />
			<TypographyStylesProvider>
				<div
					dangerouslySetInnerHTML={{ __html: details }}
					style={{ textAlign: "center", fontSize: "13px" }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
