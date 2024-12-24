import { Box, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";
import { decodeHtml } from "../../../../../utils";

export default function SummarySection({ details }) {
	const decodedDetails = decodeHtml(details);

	return (
		<Box component="section" px={20}>
			<CvHeading heading="Summary" ta="center" />
			<HeadingDivider w={{ base: 240, md: 350 }} mx="auto" />
			<TypographyStylesProvider>
				<div
					dangerouslySetInnerHTML={{ __html: decodedDetails }}
					style={{ textAlign: "center", fontSize: "13px" }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
