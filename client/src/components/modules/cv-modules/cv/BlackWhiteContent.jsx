import { useSelector } from "react-redux";
import { selectCvValue } from "../../../../store/cv/cvSlice";
import { Box, Button, Flex } from "@mantine/core";
import TopSection from "../cvTemplates/blackWhite/TopSection";
import EducationSection from "../cvTemplates/blackWhite/EducationSection";
import WorkExperience from "../cvTemplates/blackWhite/WorkExperience";
import TechnicalSkillsSection from "../cvTemplates/blackWhite/TechnicalSkillsSection";
import ThemeButton from "../../../common/ThemeButton";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import CVContentPdfVersion from "../cvTemplates/blackWhite/CVContentPdfVersion";
import { EmptyResult } from "../../../common/EmptyResult";

export default function BlackWhiteContent({ closeModal = () => {} }) {
	const cv = useSelector(selectCvValue);
	const contentRef = useRef();
	const reactToPrintFn = useReactToPrint({
		contentRef,
		onBeforeGetContent: () => {
			// Dynamically add @page styles
			const style = document.createElement("style");
			style.id = "dynamic-print-style";
			style.innerHTML = `
                @page {
                    size: 8.5in 14in;
                }
            `;
			document.head.appendChild(style);
		},
		onAfterPrint: () => {
			// Remove the dynamically added @page styles
			const style = document.getElementById("dynamic-print-style");
			if (style) {
				document.head.removeChild(style);
			}
		},
	});

	// if form content is empty then return the empty result
	if (!cv?.fname) return <EmptyResult />;

	return (
		<section>
			<Box
				className="cv-content-black-white"
				bd="1px solid #dfdfdf"
				bg="white"
				style={{ borderRadius: "8px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
				pb={20}
			>
				{/* --------- basic info section --------- */}
				<TopSection cv={cv} />
				{/* ---------- education section ----------- */}
				<EducationSection educations={cv?.education} />
				{/* --------- work experience section ---------- */}
				<WorkExperience workExperiences={cv?.professionalExp} />
				{/* --------- technical skills ---------- */}
				<TechnicalSkillsSection technicalSkills={cv?.technicalSkills} />
			</Box>
			{/* --------- PDF version component --------- */}
			<Box hidden>
				<CVContentPdfVersion cv={cv} ref={contentRef} closeModal={closeModal} />
			</Box>
			<Flex mt={15} gap={10} align="center" justify="right">
				<ThemeButton />
				<Button bg="green" onClick={reactToPrintFn}>
					Generate pdf now
				</Button>
			</Flex>
		</section>
	);
}
