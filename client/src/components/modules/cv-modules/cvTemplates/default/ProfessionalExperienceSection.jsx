import { Box, Flex, Stack, Text, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";
import { decodeHtml } from "../../../../../utils";

export default function ProfessionalExperienceSection({ proExperience }) {
	return (
		<Box component="section" px={20}>
			<CvHeading heading="PROFESSIONAL EXPERIENCE" />
			<HeadingDivider w={{ base: 240, md: 350 }} />
			<Stack gap={15}>
				{proExperience?.map((pro) => (
					<Box key={pro.orgName}>
						<Flex justify="space-between">
							<Text fw="bold" size="14px">
								{pro.orgName} {pro.currentlyWorking ? "(Present)" : ""}
							</Text>
							<Text size="12px" fs="italic">
								{pro.duration}
							</Text>
						</Flex>
						<Text size="14px" my={5}>
							{pro.designation}
						</Text>
						<TypographyStylesProvider style={{ fontSize: "13px" }}>
							<div dangerouslySetInnerHTML={{ __html: decodeHtml(pro.role) }} />
						</TypographyStylesProvider>
					</Box>
				))}
			</Stack>
		</Box>
	);
}
