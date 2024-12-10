import { Alert, Button, Flex, Stack, Text } from "@mantine/core";
import { IconInfoCircle, IconRosetteDiscountCheckFilled, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function SaveAlert({ resetKey = () => {}, setShowAlert = () => {} }) {
	const icon = <IconInfoCircle />;
	const navigate = useNavigate();

	return (
		<Alert
			pos="fixed"
			style={{ zIndex: 9999 }}
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
				<Flex mt={10} gap={10}>
					<Button w={90} onClick={() => navigate("/result")} bg="#e8f5e9" c="teal">
						<IconRosetteDiscountCheckFilled size={16} stroke={1.5} />
						<Text ml={4}>OK</Text>
					</Button>
					<Button
						w={120}
						onClick={() => {
							setShowAlert(false);
							resetKey();
						}}
						bg="#feebeb"
						c="red"
					>
						<IconX size={16} stroke={1.5} />
						<Text ml={4}>Cancel</Text>
					</Button>
				</Flex>
			</Stack>
		</Alert>
	);
}
