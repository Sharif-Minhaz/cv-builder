import { useSelector } from "react-redux";
import { selectCvValue } from "../features/cv/cvSlice";
import { useNavigate } from "react-router-dom";

import TopSection from "./cvParts/TopSection";
import { Box, Button, Divider, Flex, Grid } from "@mantine/core";
import SummarySection from "./cvParts/SummarySection";
import EducationSection from "./cvParts/EducationSection";
import TechnicalSkillsSection from "./cvParts/TechnicalSkillsSection";
import ProfessionalExperienceSection from "./cvParts/ProfessionalExperienceSection";
import PortfolioSection from "./cvParts/PortfolioSection";
import LanguageSection from "./cvParts/LanguageSection";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function CVContent({ closeModal = () => {} }) {
	const cv = useSelector(selectCvValue);
	const navigate = useNavigate();
	const contentRef = useRef();

	const reactToPrintFn = useReactToPrint({
		contentRef,
	});

	return (
		<section>
			<Box className="cv-content" bd="1px solid #dfdfdf" pb={20} ref={contentRef}>
				<TopSection cv={cv} />
				<Divider className="section-divider" size="4px" mb={12} />
				<SummarySection details={cv?.summary} />
				<Grid mt={16}>
					<Grid.Col span={7} style={{ borderRight: "2px solid #7b7b7b" }}>
						<EducationSection educations={cv?.education} />
						<TechnicalSkillsSection technicalSkills={cv?.technicalSkills} />
						<ProfessionalExperienceSection proExperience={cv?.professionalExp} />
					</Grid.Col>
					<Grid.Col span={5}>
						<PortfolioSection portfolio={cv?.portfolio} />
						<LanguageSection languages={cv?.languages} />
					</Grid.Col>
				</Grid>
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
				<Button bg="red">
					<IconTrash size={17} />
					Delete
				</Button>
			</Flex>
		</section>
	);
}
