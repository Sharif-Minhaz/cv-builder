import { Button, em, Flex, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function EducationList({
	education,
	index,
	handleEditEducation,
	handleRemoveEducation,
}) {
	const isMediumDevice = useMediaQuery(`(max-width: ${em(950)})`);
	return (
		<Grid
			key={index}
			align="center"
			mt={10}
			py={10}
			style={{ borderBottom: "1px solid #e5e5e5" }}
		>
			<Grid.Col
				style={
					isMediumDevice
						? { borderBottom: "1px solid #e5e5e5", borderRight: "1px solid #e5e5e5" }
						: { borderRight: "1px solid #e5e5e5" }
				}
				span={isMediumDevice ? 6 : 3}
			>
				<Text>{education.orgName}</Text>
			</Grid.Col>
			<Grid.Col
				style={
					isMediumDevice
						? { borderBottom: "1px solid #e5e5e5" }
						: { borderRight: "1px solid #e5e5e5" }
				}
				span={isMediumDevice ? 6 : 2}
			>
				<Text>{education.duration}</Text>
			</Grid.Col>
			<Grid.Col style={{ borderRight: "1px solid #e5e5e5" }} span={isMediumDevice ? 6 : 3}>
				<Text>{education.title}</Text>
			</Grid.Col>
			<Grid.Col span={isMediumDevice ? 6 : 2}>
				<Text>{education.grade}</Text>
			</Grid.Col>
			<Grid.Col span={isMediumDevice ? 12 : 2}>
				<Flex gap={5} justify={isMediumDevice ? "flex-start" : "flex-end"}>
					<a href="/#educations">
						<Button color="yellow" onClick={() => handleEditEducation(index)}>
							<IconEdit size={14} />
						</Button>
					</a>
					<Button color="red" onClick={() => handleRemoveEducation(index)}>
						<IconTrash size={14} />
					</Button>
				</Flex>
			</Grid.Col>
		</Grid>
	);
}
