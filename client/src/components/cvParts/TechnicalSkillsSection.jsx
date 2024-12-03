import { Box, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";

export default function TechnicalSkillsSection({ technicalSkills }) {
	return (
		<Box component="section" px={20}>
			<CvHeading heading="Technical skills" />
			<HeadingDivider w={{ base: 200, md: 300 }} />
			<TypographyStylesProvider>
				<div
					style={{ fontSize: "12px", lineHeight: "12px" }}
					dangerouslySetInnerHTML={{ __html: technicalSkills }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
