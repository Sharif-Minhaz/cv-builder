import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Stack, Divider, Text, Box, Grid, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import ImageDropzone from "../../ImageDropzone";
import RichTextEditorComponent from "../../RichTextEditorComponent";
import PreviewModal from "../../PreviewModal";
import { useDispatch, useSelector } from "react-redux";
import { selectCvValue, addDataToStore, clearDataFromStore } from "../../../store/cv/cvSlice";
import BasicFields from "../../BasicFields";
import EducationFields from "../../EducationFields";
import ProfessionalFields from "../../ProfessionalFields";
// import SaveAlert from "../../SaveAlert";
import ConfirmModal from "../../ConfirmModal";
import { IconX } from "@tabler/icons-react";
import RequiredStar from "../../RequiredStar";
import { decodeHtml, strippedText } from "../../../utils";
import { useNavigate } from "react-router-dom";
import {
	useCreateCVMutation,
	useUpdateCVMutation,
	useDeleteCVMutation,
} from "../../../store/api/cvSliceApi";
import { notifications } from "@mantine/notifications";
import { selectAuthValue } from "../../../store/auth/authSlice";
import DefaultCVContent from "./DefaultCVContent";

const errorResponse = {
	title: "Error",
	message: "Something went wrong. Please try again.",
	bg: "red",
	color: "white",
};

export default function CVForm() {
	const user = useSelector(selectAuthValue);
	const cvValue = useSelector(selectCvValue);
	const [createCV, cvResponseInfo] = useCreateCVMutation();
	const [updateCV, cvUpdateInfo] = useUpdateCVMutation();
	const [deleteCV] = useDeleteCVMutation();
	const navigate = useNavigate();
	// const [showAlert, setShowAlert] = useState(false);
	const [key, setKey] = useState(1);
	const [formKey, setFormKey] = useState(0);
	const dispatch = useDispatch();
	const [opened, { open, close }] = useDisclosure(false);
	const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

	const initialValues = {
		profileImage: cvValue?.profileImage || "",
		expectedSalary: cvValue?.expectedSalary || "",
		fname: cvValue?.fname || user?.username || "",
		designation: cvValue?.designation || "",
		email: cvValue?.email || user?.email || "",
		mobile: cvValue?.mobile || "",
		github: cvValue?.github || "",
		linkedIn: cvValue?.linkedIn || "",
		website: cvValue?.website || "",
		summary: decodeHtml(cvValue?.summary) || "",
		education: cvValue?.education?.[0]?.orgName ? cvValue?.education : [], // { orgName: "", duration: "", title: "", grade: 0 }
		technicalSkills: decodeHtml(cvValue?.technicalSkills) || "",
		professionalExp: cvValue?.professionalExp?.[0]?.orgName
			? cvValue?.professionalExp?.map((item) => {
					if (item.role) {
						return {
							...item,
							role: decodeHtml(item.role), // Decode the role field
						};
					}
					return item; // Return the item as is if `role` is not present
			  })
			: [], // { orgName: "", duration: "", designation: "", role: "" }
		portfolio: decodeHtml(cvValue?.portfolio) || "",
		languages: decodeHtml(cvValue?.languages) || "",
	};

	const form = useForm({
		initialValues,
		validate: {
			profileImage: (value) => {
				if (typeof value !== "string" || value.trim().length === 0) {
					return "Upload a profile image";
				}
				return null;
			},
			fname: (value) => (value?.trim().length > 0 ? null : "First name is required"),
			expectedSalary: (value) => (value > 0 ? null : "Expected salary is required"),
			designation: (value) => (value?.trim().length > 0 ? null : "Designation is required"),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email address"),
			mobile: (value) => (value?.trim().length > 0 ? null : "Mobile number required"),
			github: (value) =>
				value?.trim().length > 0
					? /^(https?:\/\/)?(www\.)?github\.com\/\S+$/.test(value)
						? null
						: "Invalid GitHub URL"
					: "Github link is required",
			linkedIn: (value) => (value?.trim().length > 0 ? null : "Linked In link is required"),
			website: (value) =>
				value?.trim().length > 0
					? /^(https?:\/\/)?(www\.)?\S+$/.test(value)
						? null
						: "Invalid website URL"
					: "Website link is required",
			summary: (value) => (strippedText(value).length > 0 ? null : "Bio is required"),
			education: (values) => (!values.length ? "Education details are required" : null),
			technicalSkills: (value) =>
				strippedText(value).length > 0 ? null : "Technical skills are required",
			professionalExp: (values) =>
				!values.length ? "Professional experience is required" : null,
			portfolio: (value) =>
				strippedText(value).length > 0 ? null : "Portfolio section is required",

			languages: (value) =>
				strippedText(value).length > 0 ? null : "Languages are required",
		},
	});

	const handleSuccessCVSubmission = (response, values) => {
		if (response.success) {
			// setShowAlert(true);
			dispatch(addDataToStore(values));
			localStorage.setItem("cv", JSON.stringify({ json: values }));
			navigate("/result");
		} else {
			console.error(response);
			notifications.show(errorResponse);
		}
	};

	// global form submission handler
	const handleSubmit = async (values) => {
		// handle user identification
		let isGuest = !cvValue?._id;
		try {
			if (isGuest) {
				// save response to database
				const response = await createCV(values).unwrap();
				return handleSuccessCVSubmission(response, values);
			}

			const response = await updateCV(values).unwrap();
			handleSuccessCVSubmission(response, values);
		} catch (error) {
			console.error(error);
			notifications.show(errorResponse);
		}
	};

	// handle summary rich text editor
	const handleSummaryChange = (value) => {
		form.setFieldValue("summary", value);
	};

	// handle technical skills handler
	const handleTechnicalSkillsChange = (value) => {
		form.setFieldValue("technicalSkills", value);
	};

	// handle portfolio
	const handlePortfolioChange = (value) => {
		form.setFieldValue("portfolio", value);
	};

	// handle languages changes
	const handleLanguageChange = (value) => {
		form.setFieldValue("languages", value);
	};

	const resetFields = () => {
		const auth = JSON.parse(localStorage.getItem("auth") || "null");
		// reset redux store
		dispatch(clearDataFromStore());
		// reset rich text editors
		setKey((prev) => prev + Date.now());
		// clear local storage
		localStorage.removeItem("cv");
		localStorage.removeItem("auth");
		deleteCV(auth);
		form.reset();
		setFormKey(Date.now());
		// close confirmation modal
		close();
		navigate("/result");
	};

	return (
		<Box
			component="section"
			bd="1px solid #dfdfdf"
			p={{ base: 10, sm: 20 }}
			bg="white"
			style={{ borderRadius: "8px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
		>
			{/* {showAlert && <SaveAlert setShowAlert={setShowAlert} />} */}
			{/* ----------- form wrapper ---------- */}
			<form key={formKey} onSubmit={form.onSubmit(handleSubmit)}>
				{/* --------- image selector ----------- */}
				<Grid>
					<Grid.Col span={{ base: 12, sm: 3 }}>
						<Flex justify="center">
							<ImageDropzone key={key} form={form} />
						</Flex>
					</Grid.Col>
					<Grid.Col span={{ base: 12, sm: 9 }}>
						{/* ----------- summary here ---------- */}
						<Stack mt={9}>
							<Text size="18px">
								Enter your Bio <RequiredStar />
							</Text>
							<RichTextEditorComponent
								key={key}
								form={form}
								error={form.errors?.summary}
								value={form.values.summary}
								onChange={handleSummaryChange}
								placeholder="Enter your Bio"
								h={220}
							/>
						</Stack>
					</Grid.Col>
				</Grid>
				<Divider mb={4} mt={14} />
				{/* ----------- basic information fields (name, designation, email etc) ---------- */}
				<BasicFields form={form} />

				{/*-------- education section ---------- */}
				<EducationFields form={form} />

				{/* -------- technical skills section -------- */}
				<Stack mt={20}>
					<Text size="22px">
						Technical Skills <RequiredStar />
					</Text>
					<Divider mb={10} />
					<RichTextEditorComponent
						key={key}
						error={form.errors?.technicalSkills}
						value={form.values.technicalSkills}
						onChange={handleTechnicalSkillsChange}
						placeholder="Enter your technical skills (eg. HTML, CSS, JavaScript etc)"
					/>
				</Stack>

				{/* ------- professional experience section ------- */}
				<ProfessionalFields form={form} />

				{/* ------- Portfolio section ------- */}
				<Stack mt={32} mb={8}>
					<Text size="22px">
						Portfolio Section <RequiredStar />
					</Text>
					<Divider />
					<RichTextEditorComponent
						key={key}
						value={form.values.portfolio}
						error={form.errors?.portfolio}
						onChange={handlePortfolioChange}
						placeholder="Enter your portfolio section (Project Name, Links, Description, Tech Stack etc)"
					/>
				</Stack>

				{/* ------- Language section ------- */}
				<Stack mt={32} mb={8}>
					<Text size="22px">
						Include Languages <RequiredStar />
					</Text>
					<Divider />
					<RichTextEditorComponent
						key={key}
						value={form.values?.languages}
						error={form.errors?.languages}
						onChange={handleLanguageChange}
						placeholder="Enter your preferred communication language (English, French, Spanish etc)"
					/>
				</Stack>

				{/* ------- form action section ------- */}
				<Flex gap={10} wrap="wrap" justify={{ base: "center", sm: "flex-end" }} mt="md">
					{/* ---------- preview modal ---------- */}
					<PreviewModal
						opened={openedModal}
						cv={cvValue}
						previewButton={
							<Button disabled={!cvValue?.fname} onClick={openModal}>
								Full Preview
							</Button>
						}
					>
						<DefaultCVContent closeModal={closeModal} />
					</PreviewModal>

					{/* ---------- save button ---------- */}
					<Button
						loading={cvResponseInfo.isLoading || cvUpdateInfo.isLoading}
						disabled={cvResponseInfo.isLoading}
						bg="teal"
						type="submit"
						onClick={() => {
							if (!form.isValid()) {
								notifications.show({
									title: "Form error occurred",
									message: "Check out the error fileds.",
									color: "red",
									bg: "#fff0ce",
									style: { color: "yellow" },
								});
							}
						}}
					>
						<Text ml={4}>Save</Text>
					</Button>
					<ConfirmModal
						text="Are you sure you want to reset the form?"
						opened={opened}
						close={close}
						title="Reset form data"
					>
						<Button w={100} type="button" bg="red" onClick={resetFields}>
							<IconX />
							<Text>Reset</Text>
						</Button>
					</ConfirmModal>
					<Button type="button" bg="red" onClick={open}>
						Reset
					</Button>
				</Flex>
			</form>

			<Divider my={15} />

			{/* direct preview content */}
			<DefaultCVContent liveCv={form.values} />
		</Box>
	);
}
