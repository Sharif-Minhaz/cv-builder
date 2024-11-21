import { Box, Divider, Flex, Text, TypographyStylesProvider } from "@mantine/core";

export default function ProfessionalExperienceSection({ proExperience }) {
	return (
		<section>
			<Box component="h2">PROFESSIONAL EXPERIENCE</Box>
			<Divider />
			<Box>
				{proExperience.map((pro) => (
					<Box key={pro.orgName}>
						<Flex justify="space-between">
							<Text>{pro.orgName}</Text>
							<Text fs="italic">{pro.duration}</Text>
						</Flex>
						<Text>{pro.title}</Text>
						<TypographyStylesProvider>
							<div dangerouslySetInnerHTML={{ __html: pro.role }} />
						</TypographyStylesProvider>
					</Box>
				))}
			</Box>
		</section>
	);
}
