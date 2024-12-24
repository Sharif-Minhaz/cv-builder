import { forwardRef } from "react";
import TopSection from "./TopSection";
import { Box, Divider, Grid } from "@mantine/core";
import SummarySection from "./SummarySection";
import EducationSection from "./EducationSection";
import TechnicalSkillsSection from "./TechnicalSkillsSection";
import ProfessionalExperienceSection from "./ProfessionalExperienceSection";
import PortfolioSection from "./PortfolioSection";
import LanguageSection from "./LanguageSection";

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
