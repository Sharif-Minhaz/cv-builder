import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import CVContent from "./CVContent";

export default function PreviewModal() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} title="Authentication">
				<CVContent />
			</Modal>

			<Button onClick={open}>Preview</Button>
		</>
	);
}
