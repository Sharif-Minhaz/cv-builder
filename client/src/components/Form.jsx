import { useState } from "react";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import superjson from "superjson";
import { Button, Group, Stack, Divider, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import ImageDropzone from "./ImageDropzone";
import RichTextEditorComponent from "./RichTextEditorComponent";
import PreviewModal from "./PreviewModal";
import { useDispatch, useSelector } from "react-redux";
import { selectCvValue, addDataToStore, clearDataFromStore } from "../features/cv/cvSlice";
import BasicFields from "./BasicFields";
import EducationFields from "./EducationFields";
import ProfessionalFields from "./ProfessionalFields";
import SaveAlert from "./SaveAlert";
import ConfirmModal from "./ConfirmModal";
import { IconX } from "@tabler/icons-react";
import RequiredStar from "./RequiredStar";
import { strippedText } from "../utils";

export default function CVForm() {
	const [showAlert, setShowAlert] = useState(false);
	const [key, setKey] = useState(Date.now());
	const cvValue = useSelector(selectCvValue);
	const dispatch = useDispatch();
	const [opened, { open, close }] = useDisclosure(false);

	const initialValues = {
		profileImage: cvValue?.profileImage || "",
		fname: cvValue?.fname || "",
		designation: cvValue?.designation || "",
		email: cvValue?.email || "",
		mobile: cvValue?.mobile || "",
		github: cvValue?.github || "",
		linkedIn: cvValue?.linkedIn || "",
		website: cvValue?.website || "",
		summary: cvValue?.summary || "",
		education: cvValue?.education?.[0]?.orgName ? cvValue?.education : [], // { orgName: "", duration: "", title: "", grade: 0 }
		technicalSkills: cvValue?.technicalSkills || "",
		professionalExp: cvValue?.professionalExp?.[0]?.orgName ? cvValue?.professionalExp : [], // { orgName: "", duration: "", designation: "", role: "" }
		portfolio: cvValue?.portfolio || "",
		languages: cvValue?.languages || "",
	};

	const [_, setValue] = useLocalStorage({
		key: "cv",
		defaultValue: "{}",
		serialize: superjson.stringify,
		deserialize: (str) => (str === undefined ? "{}" : superjson.parse(str)),
	});

	const form = useForm({
		mode: "uncontrolled",
		initialValues,
		validate: {
			profileImage: (value) =>
				value?.trim().length > 0 ? null : "Profile image is required",
			fname: (value) => (value.trim().length > 0 ? null : "First name is required"),
			designation: (value) => (value.trim().length > 0 ? null : "Designation is required"),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email address"),
			mobile: (value) => (/^\d{11}$/.test(value) ? null : "Mobile number must be 11 digits"),
			github: (value) =>
				value.trim().length > 0
					? /^https:\/\/github.com\/\S+$/.test(value)
						? null
						: "Invalid GitHub URL"
					: "Github link is required",
			linkedIn: (value) =>
				value.trim().length > 0
					? /^https:\/\/(www\.)?linkedin.com\/\S+$/.test(value)
						? null
						: "Invalid LinkedIn URL"
					: "Linked In link is required",
			website: (value) =>
				value.trim().length > 0
					? /^https?:\/\/\S+$/.test(value)
						? null
						: "Invalid website URL"
					: "Website link is required",
			summary: (value) => (strippedText(value).length > 0 ? null : "Summary is required"),
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

	// add new education section
	const addEducation = ({ orgName, duration, title, grade }) => {
		form.insertListItem("education", { orgName, duration, title, grade });
	};

	// Remove specific education fieldset
	const removeEducation = (index) => {
		form.removeListItem("education", index);
	};

	// add new professional experience
	const addProfessionalExp = ({ orgName, duration, designation, role }) => {
		form.insertListItem("professionalExp", {
			orgName,
			duration,
			designation,
			role,
		});
	};

	// remove professional experience
	const removeProfessionalExp = (index) => {
		form.removeListItem("professionalExp", index);
	};

	// global form submission handler
	const handleSubmit = (values) => {
		dispatch(addDataToStore(values));
		setValue(values);
		setShowAlert(true);
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
		// reset form fields
		form.reset();
		// reset redux store
		dispatch(clearDataFromStore());
		// reset rich text editors
		setKey((prev) => prev + Date.now());
		// clear local storage
		localStorage.clear();
		// close confirmation modal
		close();
	};

	return (
		<>
			{showAlert && <SaveAlert />}
			{/* ----------- form wrapper ---------- */}
			<form onSubmit={form.onSubmit(handleSubmit)}>
				{/* --------- image selector ----------- */}
				<ImageDropzone key={key} form={form} />
				<Divider mb={4} mt={14} />
				{/* ----------- basic information fields (name, designation, email etc) ---------- */}
				<BasicFields form={form} />
				{/* ----------- summary here ---------- */}
				<Stack mt={18}>
					<Text size="15px">Summary</Text>
					<RichTextEditorComponent
						key={key}
						form={form}
						error={form.errors?.summary}
						value={form.values.summary}
						onChange={handleSummaryChange}
						placeholder="Enter your summary"
					/>
				</Stack>

				{/*-------- education section ---------- */}
				<EducationFields
					addEducation={addEducation}
					removeEducation={removeEducation}
					form={form}
				/>

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
						placeholder="Enter your technical skills"
					/>
				</Stack>

				{/* ------- professional experience section ------- */}
				<ProfessionalFields
					addProfessionalExp={addProfessionalExp}
					removeProfessionalExp={removeProfessionalExp}
					form={form}
				/>

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
						placeholder="Enter your portfolio section"
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
						placeholder="Enter your preferred language"
					/>
				</Stack>

				{/* ------- form action section ------- */}
				<Group justify="flex-end" mt="md">
					<PreviewModal />
					<Button
						// onClick={() => {
						// 	console.log(form.values);
						// 	console.error(form.errors);
						// }}
						bg="teal"
						type="submit"
					>
						Save
					</Button>
					<ConfirmModal
						text="Are you sure you want to reset the form?"
						opened={opened}
						close={close}
						title="Reset form data"
					>
						<Button w={100} type="reset" bg="red" onClick={resetFields}>
							<IconX />
							<Text>Reset</Text>
						</Button>
					</ConfirmModal>
					<Button type="reset" bg="red" onClick={open}>
						Reset
					</Button>
				</Group>
			</form>
		</>
	);
}
