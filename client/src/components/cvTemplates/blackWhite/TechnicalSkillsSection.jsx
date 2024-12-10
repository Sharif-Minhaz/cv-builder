import { Box, TypographyStylesProvider } from "@mantine/core";
import { decodeHtml } from "../../../utils";
import CvHeading from "./CvHeading";

export default function TechnicalSkillsSection({ technicalSkills }) {
	const decodedTech = decodeHtml(technicalSkills);

	return (
		<Box component="section" mt={-15}>
			<CvHeading heading="Technical skills" />
			<TypographyStylesProvider px={20}>
				<div
					style={{ fontSize: "14px", lineHeight: "18px" }}
					dangerouslySetInnerHTML={{ __html: decodedTech }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
