import { forwardRef } from "react";
import TopSection from "./TopSection";
import { Box } from "@mantine/core";
import EducationSection from "./EducationSection";
import TechnicalSkillsSection from "./TechnicalSkillsSection";
import WorkExperience from "./WorkExperience";

const CVContentPdfVersion = forwardRef((props, ref) => {
	const cv = props?.cv;

	return (
		<section>
			<Box
				className="cv-content-black-white"
				bd="1px solid #dfdfdf"
				bg="white"
				style={{ borderRadius: "8px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
			>
				<Box ref={ref} pt={10}>
					{/* --------- basic info section --------- */}
					<TopSection pdf cv={cv} />
					{/* ---------- education section ----------- */}
					<EducationSection pdf educations={cv?.education} />
					{/* --------- work experience section ---------- */}
					<WorkExperience pdf workExperiences={cv?.professionalExp} />
					{/* --------- technical skills ---------- */}
					<TechnicalSkillsSection pdf technicalSkills={cv?.technicalSkills} />
				</Box>
			</Box>
		</section>
	);
});

CVContentPdfVersion.displayName = "CVContentPdfVersion";

export default CVContentPdfVersion;
