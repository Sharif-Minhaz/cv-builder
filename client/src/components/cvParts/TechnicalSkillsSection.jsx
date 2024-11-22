import { Box, Divider, TypographyStylesProvider } from "@mantine/core";

export default function TechnicalSkillsSection({ technicalSkills }) {
	return (
		<section>
			<Box component="h2">TECHNICAL SKILLS</Box>
			<Divider />
			<TypographyStylesProvider>
				<div dangerouslySetInnerHTML={{ __html: technicalSkills }} />
			</TypographyStylesProvider>
		</section>
	);
}
