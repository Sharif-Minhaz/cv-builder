import { Modal } from "@mantine/core";

export default function PreviewModal({ opened, close, previewButton, children }) {
	return (
		<>
			<Modal zIndex={9200} size="80%" opened={opened} onClose={close} title="Preview">
				{/* ------- children content children ------- */}
				{children}
			</Modal>

			{/* ------- Triggered button component ------ */}
			{previewButton}
		</>
	);
}
