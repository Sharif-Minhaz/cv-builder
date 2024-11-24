import { Alert, Button, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function SaveAlert() {
	const icon = <IconInfoCircle />;
	const navigate = useNavigate();

	return (
		<Alert
			pos="fixed"
			style={{ zIndex: 100 }}
			top={10}
			right={10}
			size="md"
			variant="filled"
			color="teal"
			title="Confirmation message"
			icon={icon}
		>
			<Stack>
				<Text>Data is saved into the localStorage successfully.</Text>
				<Button bd="1px solid white" w={80} onClick={() => navigate("/result")} bg="teal">
					OK
				</Button>
			</Stack>
		</Alert>
	);
}
