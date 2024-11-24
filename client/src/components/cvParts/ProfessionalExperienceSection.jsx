import { Box, Flex, Stack, Text, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";

export default function ProfessionalExperienceSection({ proExperience }) {
	return (
		<Box component="section" px={20}>
			<CvHeading heading="PROFESSIONAL EXPERIENCE" />
			<HeadingDivider />
			<Stack gap={15}>
				{proExperience.map((pro) => (
					<Box key={pro.orgName}>
						<Flex justify="space-between">
							<Text fw="bold" size="18px">
								{pro.orgName}
							</Text>
							<Text size="13px" fs="italic">
								{pro.duration}
							</Text>
						</Flex>
						<Text my={5}>{pro.designation}</Text>
						<TypographyStylesProvider>
							<div dangerouslySetInnerHTML={{ __html: pro.role }} />
						</TypographyStylesProvider>
					</Box>
				))}
			</Stack>
		</Box>
	);
}
