import { Box, em, Flex, Stack, Text } from "@mantine/core";
import CvHeading from "./CvHeading";
import { useMediaQuery } from "@mantine/hooks";

export default function EducationSection({ pdf, educations }) {
	const isTablet = useMediaQuery(`(max-width: ${em(768)})`);

	return (
		<Box component="section" mt={-15}>
			<CvHeading heading="education" />
			<Stack gap={16} px={20}>
				{educations?.map((edu) => (
					<Flex key={edu.orgName} gap={60}>
						<Text
							style={
								pdf
									? { whiteSpace: "nowrap" }
									: isTablet
									? { whiteSpace: "nowrap", display: "none" }
									: { whiteSpace: "normal" }
							}
							mt={2}
							size="14px"
						>
							{edu.duration}
						</Text>
						<Stack gap={5}>
							<Text fw="bold" size="18px">
								{edu.orgName}
							</Text>
							<Text my={5} size="16px">
								{edu.title}
							</Text>
							<Text size="14px">Grade: {edu.grade}</Text>
							<Text
								style={
									pdf
										? { display: "none" }
										: isTablet
										? { whiteSpace: "normal" }
										: { whiteSpace: "nowrap", display: "block" }
								}
								mt={2}
								size="14px"
							>
								{edu.duration}
							</Text>
						</Stack>
					</Flex>
				))}
			</Stack>
		</Box>
	);
}
