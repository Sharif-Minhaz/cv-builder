import { Button, em, Flex, Grid, Text, TypographyStylesProvider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function ProfessionalExpList({
	experience,
	index,
	handleEditProfessionalExp,
	removeProfessionalExp,
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
				span={isMediumDevice ? 6 : 4}
			>
				<Text>{experience.orgName}</Text>
			</Grid.Col>
			<Grid.Col
				style={
					isMediumDevice
						? { borderBottom: "1px solid #e5e5e5" }
						: { borderRight: "1px solid #e5e5e5" }
				}
				span={isMediumDevice ? 6 : 4}
			>
				<Text>{experience.duration}</Text>
			</Grid.Col>
			<Grid.Col span={isMediumDevice ? 12 : 4}>
				<Text>{experience.designation}</Text>
			</Grid.Col>
			<Grid.Col span={12}>
				<TypographyStylesProvider>
					<div
						dangerouslySetInnerHTML={{
							__html: experience.role,
						}}
						style={{ borderTop: "1px solid #e5e5e5" }}
					/>
				</TypographyStylesProvider>
			</Grid.Col>
			<Flex py={15}>
				<a href="/#professional-exp">
					<Button color="yellow" mr={5} onClick={() => handleEditProfessionalExp(index)}>
						<IconEdit />
					</Button>
				</a>

				<Button color="red" onClick={() => removeProfessionalExp(index)}>
					<IconTrash />
				</Button>
			</Flex>
		</Grid>
	);
}
