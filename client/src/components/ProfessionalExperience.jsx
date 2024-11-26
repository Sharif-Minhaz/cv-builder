import { useState } from "react";
import { Box, Button, em, Grid, Text, TextInput } from "@mantine/core";
import { IconPlus, IconCheck } from "@tabler/icons-react";
import RichTextEditorComponent from "./RichTextEditorComponent";
import { useMediaQuery } from "@mantine/hooks";
import ProfessionalExpList from "./ProfessionalExpList";
import TooltipInfo from "./TooltipInfo";
import ErrorTooltip from "./ErrorTooltip";

export default function ProfessionalExperience({ form }) {
	const [key, setKey] = useState(1);
	const isMediumDevice = useMediaQuery(`(max-width: ${em(950)})`);
	const [professionalExpInput, setProfessionalExpInput] = useState({
		orgName: "",
		duration: "",
		designation: "",
		role: "",
	});

	const isProfessionalExpError = !!form.errors?.professionalExp;

	const [editIndex, setEditIndex] = useState(-1);

	// Handle text field changes
	const handleChange = (field) => (event) => {
		setProfessionalExpInput({
			...professionalExpInput,
			[field]: event.target.value,
		});
	};

	// Handle Rich Text Editor changes for "Role"
	const handleRoleChange = (value) => {
		setProfessionalExpInput({
			...professionalExpInput,
			role: value,
		});
	};

	// Add or update professional experience
	const handleAddProfessionalExp = () => {
		const { orgName, duration, designation, role } = professionalExpInput;

		if (orgName.trim() && duration.trim() && designation.trim() && role.trim()) {
			if (editIndex === -1) {
				// Add a new entry
				form.insertListItem("professionalExp", professionalExpInput);
				form.clearFieldError("professionalExp");
			} else {
				// Update an existing entry
				form.setFieldValue(`professionalExp.${editIndex}`, professionalExpInput);
				setEditIndex(-1); // Reset editing state
			}

			// Clear input fields
			setProfessionalExpInput({
				orgName: "",
				duration: "",
				designation: "",
				role: "",
			});

			setKey(Date.now());
		} else {
			alert("Please fill all the professional experience fields!");
		}
	};

	// Edit an existing professional experience entry
	const handleEditProfessionalExp = (index) => {
		setProfessionalExpInput(form.values.professionalExp[index]);
		setEditIndex(index);
	};

	// Remove a professional experience entry
	const handleRemoveProfessionalExp = (index) => {
		form.removeListItem("professionalExp", index);

		// If editing the removed entry, reset the input fields
		if (editIndex === index) {
			setProfessionalExpInput({
				orgName: "",
				duration: "",
				designation: "",
				role: "",
			});
			setEditIndex(-1);
		}
	};

	return (
		<Box>
			{/* Input Form */}
			<ErrorTooltip message={form.errors?.professionalExp}>
				<Grid mt={10}>
					<Grid.Col span={isMediumDevice ? 12 : 4}>
						<TextInput
							withAsterisk
							label="Organization Name"
							placeholder="ABC"
							value={professionalExpInput.orgName}
							rightSection={<TooltipInfo info="Organization Name" />}
							onChange={handleChange("orgName")}
							error={isProfessionalExpError}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 12 : 4}>
						<TextInput
							withAsterisk
							label="Duration"
							placeholder="Jul 10 - Dec 10"
							value={professionalExpInput.duration}
							rightSection={<TooltipInfo info="Professional experience duration" />}
							onChange={handleChange("duration")}
							error={isProfessionalExpError}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 12 : 4}>
						<TextInput
							withAsterisk
							label="Designation"
							placeholder="Software Engineer"
							value={professionalExpInput.designation}
							rightSection={<TooltipInfo info="Designation on profession" />}
							onChange={handleChange("designation")}
							error={isProfessionalExpError}
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Text mb={14} size="14px">
							Describe Role
						</Text>
						<RichTextEditorComponent
							key={key}
							onChange={handleRoleChange}
							value={professionalExpInput.role}
							placeholder="Describe professional experience"
							error={form.errors?.professionalExp}
							disableErrorTooltip
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						{editIndex === -1 ? (
							<Button onClick={handleAddProfessionalExp}>
								<Text mr={5}>ADD</Text>
								<IconPlus size={15} />
							</Button>
						) : (
							<Button bg="teal" onClick={handleAddProfessionalExp}>
								<Text mr={5}>UPDATE</Text>
								<IconCheck size={15} />
							</Button>
						)}
					</Grid.Col>
				</Grid>
			</ErrorTooltip>

			{/* Professional Experience List */}
			{form.values?.professionalExp?.length > 0 && (
				<Box mt={20}>
					<Text size="lg" weight={500} mb={10}>
						Professional Experiences List
					</Text>
					{form.values.professionalExp.map((experience, index) => (
						<ProfessionalExpList
							removeProfessionalExp={handleRemoveProfessionalExp}
							handleEditProfessionalExp={handleEditProfessionalExp}
							key={index}
							experience={experience}
							index={index}
						/>
					))}
				</Box>
			)}
		</Box>
	);
}
