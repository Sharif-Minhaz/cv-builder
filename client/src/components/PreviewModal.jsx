import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import CVContent from "./CVContent";

export default function PreviewModal() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal size="80%" opened={opened} onClose={close} title="Preview">
				<CVContent closeModal={close} />
			</Modal>

			<Button onClick={open}>Preview</Button>
		</>
	);
}
