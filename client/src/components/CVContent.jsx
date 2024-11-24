import { useDispatch, useSelector } from "react-redux";
import { selectCvValue, clearDataFromStore } from "../features/cv/cvSlice";
import { useNavigate } from "react-router-dom";

import TopSection from "./cvParts/TopSection";
import { Box, Button, Divider, em, Flex, Grid } from "@mantine/core";
import SummarySection from "./cvParts/SummarySection";
import EducationSection from "./cvParts/EducationSection";
import TechnicalSkillsSection from "./cvParts/TechnicalSkillsSection";
import ProfessionalExperienceSection from "./cvParts/ProfessionalExperienceSection";
import PortfolioSection from "./cvParts/PortfolioSection";
import LanguageSection from "./cvParts/LanguageSection";
import { IconArrowLeft, IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import CVContentPdfVersion from "./CVContentPdfVersion";
import ConfirmModal from "./ConfirmModal";

export default function CVContent({ closeModal = () => {} }) {
	const cv = useSelector(selectCvValue);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const contentRef = useRef();
	const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

	// modal config
	const [opened, { open, close }] = useDisclosure(false);

	const reactToPrintFn = useReactToPrint({
		contentRef,
	});

	const handleCVDataDelete = () => {
		// clear localstorage
		localStorage.clear();
		// close confirmation modal
		close();
		// clear redux store for cv
		dispatch(clearDataFromStore());
		// navigate to home
		navigate("/");
	};

	return (
		<section>
			<Box className="cv-content" bd="1px solid #dfdfdf" pb={20}>
				<TopSection cv={cv} />
				<Divider className="section-divider" size="4px" mb={12} />
				<SummarySection details={cv?.summary} />
				<Grid mt={16}>
					<Grid.Col span={isMobile ? 12 : 7} style={{ borderRight: "2px solid #7b7b7b" }}>
						<EducationSection educations={cv?.education} />
						<TechnicalSkillsSection technicalSkills={cv?.technicalSkills} />
						<ProfessionalExperienceSection proExperience={cv?.professionalExp} />
					</Grid.Col>
					<Grid.Col span={isMobile ? 12 : 5}>
						<PortfolioSection portfolio={cv?.portfolio} />
						<LanguageSection languages={cv?.languages} />
					</Grid.Col>
				</Grid>
			</Box>
			<Box hidden>
				<CVContentPdfVersion ref={contentRef} closeModal={closeModal} />
			</Box>
			<Flex gap={12} mt={20}>
				<Button
					bg="blue"
					onClick={() => {
						navigate("/");
						closeModal();
					}}
				>
					<IconArrowLeft />
					Back
				</Button>
				<Button bg="green" onClick={reactToPrintFn}>
					Generate PDF
				</Button>
				<ConfirmModal opened={opened} close={close} title="Delete CV Data">
					<Flex gap={12} mt={16}>
						<Button bg="blue" onClick={close}>
							<IconX size={17} />
							Cancel
						</Button>
						<Button bg="red" onClick={handleCVDataDelete}>
							<IconCheck size={17} />
							Confirm
						</Button>
					</Flex>
				</ConfirmModal>
				<Button bg="red" onClick={open}>
					<IconTrash size={17} />
					Delete
				</Button>
			</Flex>
		</section>
	);
}
