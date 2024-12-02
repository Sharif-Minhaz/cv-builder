import { Box, Flex, Stack, Text } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";

export default function EducationSection({ educations }) {
	return (
		<Box component="section" px={20} mt={-15}>
			<CvHeading heading="education" />
			<HeadingDivider w={200} />
			<Stack gap={12}>
				{educations.map((edu) => (
					<Box key={edu.orgName}>
						<Flex justify="space-between">
							<Text fw="bold" size="16px">
								{edu.orgName}
							</Text>
							<Text size="12px" fs="italic">
								{edu.duration}
							</Text>
						</Flex>
						<Text my={5} size="13px">
							{edu.title}
						</Text>
						<Text size="13px">Grade: {edu.grade}</Text>
					</Box>
				))}
			</Stack>
		</Box>
	);
}
