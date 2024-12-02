import { Paper, Text, Button, Flex, Box } from "@mantine/core";
import { IconAlertHexagonOff, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function EmptyResult({ gradientAngle = 45, gradientColors = ["white", "whitesmoke"] }) {
	const navigate = useNavigate();
	const paperStyles = {
		backgroundImage: `linear-gradient(${gradientAngle}deg, ${gradientColors[0]}, ${gradientColors[1]})`,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "1rem",
		borderRadius: "0.5rem",
	};

	return (
		<Paper style={paperStyles} bd="1px solid #dfdfdf">
			<Box pt={50}>
				<IconAlertHexagonOff size={90} stroke={1.5} color="gray" />
			</Box>
			<Text c="gray" size="md" weight={700} align="center" mb="md">
				CV preview is not available, please create CV first
			</Text>
			<Flex mb={50}>
				<Button
					mt={12}
					onClick={() => navigate("/")}
					size="md"
					variant="filled"
					color="blue"
				>
					<IconPlus size={18} stroke={1.5} style={{ marginRight: 5 }} />
					Create CV Now
				</Button>
			</Flex>
		</Paper>
	);
}
