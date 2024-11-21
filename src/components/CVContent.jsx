import { useSelector } from "react-redux";
import { selectCvValue } from "../features/cv/cvSlice";

import TopSection from "./cvParts/TopSection";
import { Box, Button, Divider, Grid } from "@mantine/core";
import SummarySection from "./cvParts/SummarySection";
import EducationSection from "./cvParts/EducationSection";
import TechnicalSkillsSection from "./cvParts/TechnicalSkillsSection";
import ProfessionalExperienceSection from "./cvParts/ProfessionalExperienceSection";
import PortfolioSection from "./cvParts/PortfolioSection";
import LanguageSection from "./cvParts/LanguageSection";

export default function CVContent() {
	const cv = useSelector(selectCvValue);

	return (
		<section>
			<Box>
				<TopSection cv={cv} />
				<Divider size="4px" my={12} />
				<SummarySection details={cv?.summary} />
				<Grid>
					<Grid.Col span={7} style={{ borderRight: "2px solid grey" }}>
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
			<Button bg="green">Generate PDF</Button>
		</section>
	);
}
