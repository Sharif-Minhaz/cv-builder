import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import CVContent from "./modules/cv/CVContent";
import { selectCvValue } from "../store/cv/cvSlice";
import { useSelector } from "react-redux";

export default function PreviewModal() {
	const [opened, { open, close }] = useDisclosure(false);
	const cv = useSelector(selectCvValue);

	return (
		<>
			<Modal zIndex={9200} size="80%" opened={opened} onClose={close} title="Preview">
				<CVContent closeModal={close} />
			</Modal>

			<Button disabled={!cv.fname} onClick={open}>
				Full Preview
			</Button>
		</>
	);
}
