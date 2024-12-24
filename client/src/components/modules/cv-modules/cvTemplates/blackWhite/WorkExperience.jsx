import { Box, em, Flex, Stack, Text } from "@mantine/core";
import CvHeading from "./CvHeading";
import { decodeHtml } from "../../../../../utils";
import { useMediaQuery } from "@mantine/hooks";

export default function WorkExperience({ pdf, workExperiences }) {
	const isTablet = useMediaQuery(`(max-width: ${em(768)})`);
	return (
		<Box component="section" mt={-15}>
			<CvHeading heading="work experience" />
			<Stack gap={22} px={20}>
				{workExperiences?.map((work) => (
					<Flex key={work.orgName} gap={60}>
						<Text
							style={
								pdf
									? { whiteSpace: "nowrap" }
									: isTablet
									? { display: "none" }
									: { whiteSpace: "nowrap" }
							}
							mt={2}
							size="14px"
						>
							{work.duration}
						</Text>
						<Stack gap={5}>
							<Text fw="bold" size="18px">
								{work.orgName} {work.currentlyWorking ? "(Present)" : ""}
							</Text>
							<Box
								my={5}
								dangerouslySetInnerHTML={{ __html: decodeHtml(work.role) }}
							/>
							<Text
								style={
									pdf
										? { display: "none" }
										: isTablet
										? { whiteSpace: "normal" }
										: { whiteSpace: "nowrap", display: "none" }
								}
								mt={2}
								size="14px"
							>
								{work.duration}
							</Text>
						</Stack>
					</Flex>
				))}
			</Stack>
		</Box>
	);
}
