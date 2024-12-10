import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCvValue, clearDataFromStore } from "../../../store/cv/cvSlice";
import TopSection from "../../cvTemplates/default/TopSection";
import { Box, Button, Divider, em, Flex, Grid } from "@mantine/core";
import SummarySection from "../../cvTemplates/default/SummarySection";
import EducationSection from "../../cvTemplates/default/EducationSection";
import TechnicalSkillsSection from "../../cvTemplates/default/TechnicalSkillsSection";
import ProfessionalExperienceSection from "../../cvTemplates/default/ProfessionalExperienceSection";
import PortfolioSection from "../../cvTemplates/default/PortfolioSection";
import LanguageSection from "../../cvTemplates/default/LanguageSection";
import { IconArrowLeft, IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { useReactToPrint } from "react-to-print";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import CVContentPdfVersion from "../../cvTemplates/default/CVContentPdfVersion";
import ConfirmModal from "../../ConfirmModal";
import { EmptyResult } from "../../EmptyResult";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteCVMutation } from "../../../store/api/cvSliceApi";
import { notifications } from "@mantine/notifications";
import ThemeButton from "../../ThemeButton";

export default function DefaultCVContent({ liveCv = false, closeModal = () => {} }) {
	const cvInfo = useSelector(selectCvValue);
	// checking if the liveCv prop is passed, if passed then use it otherwise use the cvInfo from redux store
	const cv = liveCv ? liveCv : cvInfo;
	const dispatch = useDispatch();
	const contentRef = useRef();
	const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
	const [deleteCV] = useDeleteCVMutation();
	const navigate = useNavigate();

	// confirmation modal config
	const [opened, { open, close }] = useDisclosure(false);

	const reactToPrintFn = useReactToPrint({
		contentRef,
	});

	const handleCVDataDelete = async () => {
		try {
			const auth = JSON.parse(localStorage.getItem("auth") || "null");
			if (!auth) {
				return notifications.show({
					title: "Error",
					message: "Please create a cv first to delete your CV",
					bg: "red",
					color: "white",
				});
			}

			const response = await deleteCV(auth).unwrap();

			if (response.success) {
				notifications.show({
					title: "Success",
					message: "CV deleted successfully",
					color: "white",
				});
				// clear localstorage
				localStorage.clear();
				// close confirmation modal
				close();
				// clear redux store for cv
				dispatch(clearDataFromStore());
				navigate("/");
			}
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to delete CV",
				bg: "red",
				color: "white",
			});
			console.error(error);
		}
	};

	// if form content is empty then return the empty result
	if (!cv.fname) return <EmptyResult />;

	return (
		<section>
			<Box
				className="cv-content"
				bd="1px solid #dfdfdf"
				bg="white"
				style={{ borderRadius: "8px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
				pb={20}
			>
				{/* --------- basic info section --------- */}
				<TopSection cv={cv} />
				<Divider className="section-divider" size="4px" mb={12} />
				{/* --------- summary section --------- */}
				<SummarySection details={cv?.summary} />
				<Grid mt={16}>
					<Grid.Col
						span={isMobile ? 12 : 7}
						style={isMobile ? {} : { borderRight: "2px solid #7b7b7b" }}
					>
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
			{/* --------- PDF version component --------- */}
			<Box hidden>
				<CVContentPdfVersion cv={cv} ref={contentRef} closeModal={closeModal} />
			</Box>
			{!liveCv ? (
				<>
					<Grid justify="right">
						<Flex
							wrap="wrap"
							justify={{ base: "center", md: "flex-end" }}
							gap={12}
							mt={20}
							mb={4}
							mr={10}
						>
							<Link to="/">
								<Button bg="blue" onClick={closeModal}>
									<IconArrowLeft />
									Back
								</Button>
							</Link>
							{/* -------- theme button ------- */}
							<ThemeButton />
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
					</Grid>
				</>
			) : (
				<Flex mt={15} gap={10} align="center" justify="right">
					<ThemeButton />
					<Button bg="green" onClick={reactToPrintFn}>
						Generate pdf now
					</Button>
				</Flex>
			)}
		</section>
	);
}
