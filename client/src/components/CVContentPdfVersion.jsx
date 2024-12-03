import TopSection from "./cvParts/TopSection";
import { Box, Divider, Grid } from "@mantine/core";
import SummarySection from "./cvParts/SummarySection";
import EducationSection from "./cvParts/EducationSection";
import TechnicalSkillsSection from "./cvParts/TechnicalSkillsSection";
import ProfessionalExperienceSection from "./cvParts/ProfessionalExperienceSection";
import PortfolioSection from "./cvParts/PortfolioSection";
import LanguageSection from "./cvParts/LanguageSection";
import { forwardRef } from "react";

const CVContentPdfVersion = forwardRef((props, ref) => {
	const cv = props?.cv;

	return (
		<section>
			<Box className="cv-content" bd="1px solid #dfdfdf" pb={20} ref={ref}>
				<TopSection pdf cv={cv} />
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
		</section>
	);
});

CVContentPdfVersion.displayName = "CVContentPdfVersion";

export default CVContentPdfVersion;
