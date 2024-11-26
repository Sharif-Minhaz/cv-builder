import { Modal, Stack, Text } from "@mantine/core";

const msgInfo = "Are you sure you want to delete this?";

export default function ConfirmModal({ opened, close, title, text = msgInfo, children }) {
	return (
		<>
			<Modal opened={opened} onClose={close} title={title}>
				<Stack>
					<Text>{text}</Text>
					{children}
				</Stack>
			</Modal>
		</>
	);
}
