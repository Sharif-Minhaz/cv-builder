import { useLocalStorage } from "@mantine/hooks";
import superjson from "superjson";
import { Button, Group, TextInput, Grid, Stack, Box, Divider, Flex, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import ImageDropzone from "./ImageDropzone";
import { IMaskInput } from "react-imask";
import RichTextEditorComponent from "./RichTextEditorComponent";
import Eduction from "./Eduction";
import ProfessionalExperience from "./ProfessionalExperience";
import { IconPlus } from "@tabler/icons-react";
import PreviewModal from "./PreviewModal";
import { useDispatch, useSelector } from "react-redux";
import { selectCvValue, addDataToStore } from "../features/cv/cvSlice";

export default function CVForm() {
	const cvValue = useSelector(selectCvValue);
	const dispatch = useDispatch();

	const initialValues = {
		profileImage: cvValue?.profileImage || "",
		fname: cvValue?.fname || "",
		designation: cvValue?.designation || "",
		email: cvValue?.email || "minhaz.rbs@gmail.com",
		mobile: cvValue?.mobile || "",
		github: cvValue?.github || "https://github.com/Sharif-Minhaz",
		linkedIn: cvValue?.linkedIn || "https://www.linkedin.com/in/minhaz-sharif-614724205",
		website: cvValue?.website || "https://github.com/Sharif-Minhaz",
		summary: cvValue?.summary || "",
		education: cvValue?.education?.[0]?.orgName
			? cvValue?.education
			: [{ orgName: "", duration: "", title: "", grade: 0 }],
		technicalSkills: cvValue?.technicalSkills || "",
		professionalExp: cvValue?.professionalExp?.[0]?.orgName
			? cvValue?.professionalExp
			: [{ orgName: "", duration: "", designation: "", role: "" }],
		portfolio: cvValue?.portfolio || "",
		languages: cvValue?.languages || "",
	};

	const [value, setValue] = useLocalStorage({
		key: "cv",
		defaultValue: "{}",
		serialize: superjson.stringify,
		deserialize: (str) => (str === undefined ? "{}" : superjson.parse(str)),
	});

	const form = useForm({
		mode: "uncontrolled",
		initialValues,

		validate: {
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
			summary: (value) => (value.trim().length > 0 ? null : "Summary is required"),
			education: (values) =>
				values.every((edu) => edu.orgName.trim() && edu.title.trim())
					? null
					: "Education fields are required",
			technicalSkills: (value) =>
				value.trim().length > 0 ? null : "Technical skills are required",
			professionalExp: (values) =>
				values.every((exp) =>
					exp.orgName.trim() && exp.designation.trim() && exp.role.trim() ? true : false
				)
					? null
					: "All professional experience fields are required",
			portfolio: (values) =>
				values.trim().length > 0 ? null : "Portfolio section is required",

			languages: (value) => (value.trim().length > 0 ? null : "Languages are required"),
		},
	});

	// add new education section
	const addEducation = () => {
		form.insertListItem("education", { orgName: "", duration: "", title: "", grade: "" });
	};

	// Remove specific education fieldset
	const removeEducation = (index) => {
		form.removeListItem("education", index);
	};

	// add new professional experience
	const addProfessionalExp = () => {
		form.insertListItem("professionalExp", {
			orgName: "",
			duration: "",
			designation: "",
			role: "",
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

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<ImageDropzone form={form} />
			<Divider mb={4} mt={14} />
			<Grid>
				{/* full name field */}
				<Grid.Col span={12}>
					<TextInput
						withAsterisk
						label="Full Name"
						placeholder="John Doe"
						key={form.key("fname")}
						mt={8}
						{...form.getInputProps("fname")}
					/>
				</Grid.Col>
				{/* Designation field */}
				<Grid.Col span={6}>
					<TextInput
						withAsterisk
						label="Your Designation"
						placeholder="designation"
						key={form.key("designation")}
						mt={8}
						{...form.getInputProps("designation")}
					/>
				</Grid.Col>
				{/* email address field */}
				<Grid.Col span={6}>
					<TextInput
						withAsterisk
						label="Your Email Address"
						placeholder="john@gmail.com"
						key={form.key("email")}
						mt={8}
						{...form.getInputProps("email")}
					/>
				</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={6}>
					{/* phone number field */}
					<TextInput
						component={IMaskInput}
						withAsterisk
						label="Your Phone number"
						mask="01000000000"
						placeholder="Your phone"
						mt={8}
						{...form.getInputProps("mobile")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					{/* github link */}
					<TextInput
						withAsterisk
						label="Your github link"
						key={form.key("github")}
						mt={8}
						placeholder="https://github.com/Sharif-Minhaz"
						{...form.getInputProps("github")}
					/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={6}>
					{/* linked in link */}
					<TextInput
						withAsterisk
						label="Your linked in link"
						key={form.key("linkedIn")}
						mt={8}
						placeholder="https://www.linkedin.com/in/minhaz-sharif-614724205"
						{...form.getInputProps("linkedIn")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					{/* website link here */}
					<TextInput
						withAsterisk
						label="Your website link"
						key={form.key("website")}
						mt={8}
						{...form.getInputProps("website")}
					/>
				</Grid.Col>
			</Grid>
			{/* ----------- summary here ---------- */}
			<Stack mt={12}>
				<Box style={{ fontSize: "15px" }}>Summary</Box>
				<RichTextEditorComponent
					value={form.values.summary}
					onChange={handleSummaryChange}
					placeholder="Enter your summary"
				/>
			</Stack>

			{/* education section */}
			<Flex align="center" justify="space-between" mt={32} mb={8}>
				<Text size="22px">Education</Text>
				<Button onClick={addEducation}>
					<IconPlus />
				</Button>
			</Flex>
			<Divider />
			{form.values?.education?.map((_, index) => (
				<Eduction removeEducation={removeEducation} index={index} form={form} key={index} />
			))}

			{/* technical skills section */}
			<Stack mt={20}>
				<Box style={{ fontSize: "22px" }}>Technical Skills</Box>
				<Divider mb={10} />
				<RichTextEditorComponent
					value={form.values.technicalSkills}
					onChange={handleTechnicalSkillsChange}
					placeholder="Enter your technical skills"
				/>
			</Stack>

			{/* professional experience section */}
			<Flex align="center" justify="space-between" mt={32} mb={8}>
				<Text size="22px">Professional Experiences</Text>
				<Button onClick={addProfessionalExp}>
					<IconPlus />
				</Button>
			</Flex>
			<Divider />
			{form.values?.professionalExp?.map((_, index) => (
				<ProfessionalExperience
					removeProfExp={removeProfessionalExp}
					index={index}
					form={form}
					key={index}
				/>
			))}

			{/* Portfolio section */}
			<Stack mt={32} mb={8}>
				<Text size="22px">Portfolio Section</Text>
				<Divider />
				<RichTextEditorComponent
					value={form.values.portfolio}
					onChange={handlePortfolioChange}
					placeholder="Enter your portfolio section"
				/>
			</Stack>

			{/* Language section */}
			<Stack mt={32} mb={8}>
				<Text size="22px">Include Languages</Text>
				<Divider />
				<RichTextEditorComponent
					value={form.values.languages}
					onChange={handleLanguageChange}
					placeholder="Enter your preferred language"
				/>
			</Stack>

			<Group justify="flex-end" mt="md">
				<PreviewModal />
				<Button bg="teal" type="submit">
					Save
				</Button>
			</Group>
		</form>
	);
}
