import { Box, Divider, Flex, Text } from "@mantine/core";

export default function EducationSection({ educations }) {
	return (
		<section>
			<Box component="h2">EDUCATION</Box>
			<Divider />
			<Box>
				{educations.map((edu) => (
					<Box key={edu.orgName}>
						<Flex justify="space-between">
							<Text>{edu.orgName}</Text>
							<Text fs="italic">{edu.duration}</Text>
						</Flex>
						<Text>{edu.title}</Text>
						<Text>{edu.grade}</Text>
					</Box>
				))}
			</Box>
		</section>
	);
}
