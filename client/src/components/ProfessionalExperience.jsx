import { useState } from "react";
import { Box, Button, em, Grid, Text } from "@mantine/core";
import { IconPlus, IconCheck } from "@tabler/icons-react";
import RichTextEditorComponent from "./RichTextEditorComponent";
import { useMediaQuery } from "@mantine/hooks";
import ErrorTooltip from "./ErrorTooltip";
import BaseTextInputBox from "./BaseTextInputBox";
import ViewResultAsTable from "./ViewResultAsTable";
import DateInputBox from "./DateInputBox";
import { convertDateToString, convertStringToDate } from "../utils";

export default function ProfessionalExperience({ form }) {
	const [key, setKey] = useState(1);
	const isMediumDevice = useMediaQuery(`(max-width: ${em(950)})`);

	// Handle input changes
	const [professionalExpInput, setProfessionalExpInput] = useState({
		orgName: "",
		duration: [null, null],
		designation: "",
		role: "",
	});

	const isProfessionalExpError = !!form.errors?.professionalExp;

	const [editIndex, setEditIndex] = useState(-1);

	// Handle text field changes
	const handleChange = (field) => (event) => {
		if (field === "duration") {
			setProfessionalExpInput({
				...professionalExpInput,
				[field]: event,
			});
			return;
		}
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

		if (orgName.trim() && duration.length && designation.trim() && role.trim()) {
			if (editIndex === -1) {
				// Add a new entry
				form.insertListItem("professionalExp", {
					...professionalExpInput,
					duration: convertDateToString(duration),
				});
				form.clearFieldError("professionalExp");
			} else {
				// Update an existing entry
				form.replaceListItem("professionalExp", editIndex, {
					...professionalExpInput,
					duration: convertDateToString(duration),
				});
				setEditIndex(-1); // Reset editing state
			}

			// Clear input fields
			setProfessionalExpInput({
				orgName: "",
				duration: [null, null],
				designation: "",
				role: "",
			});

			setKey(Date.now());
		} else {
			form.setFieldError("professionalExp", "Please fill out all the fields.");
		}
	};

	// Edit an existing professional experience entry
	const handleEditProfessionalExp = (index) => {
		const selectedProf = form.values?.professionalExp?.[index];
		setProfessionalExpInput({
			...selectedProf,
			duration: convertStringToDate(selectedProf?.duration),
		});
		setEditIndex(index);
	};

	// Remove a professional experience entry
	const handleRemoveProfessionalExp = (index) => {
		form.removeListItem("professionalExp", index);

		// If editing the removed entry, reset the input fields
		if (editIndex === index) {
			setProfessionalExpInput({
				orgName: "",
				duration: [null, null],
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
						<BaseTextInputBox
							label="Organization Name"
							placeholder="ABC"
							value={professionalExpInput.orgName}
							isError={!professionalExpInput.orgName && isProfessionalExpError}
							handleChange={handleChange("orgName")}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 12 : 4}>
						<DateInputBox
							label="Duration"
							placeholder="2001 - 2005"
							error={!professionalExpInput.duration[0] && isProfessionalExpError}
							handleChange={handleChange("duration")}
							value={professionalExpInput.duration}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 12 : 4}>
						<BaseTextInputBox
							label="Designation"
							placeholder="Software Engineer"
							value={professionalExpInput.designation}
							isError={!professionalExpInput.designation && isProfessionalExpError}
							handleChange={handleChange("designation")}
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
							placeholder="Describe your role there"
							error={!professionalExpInput.role && form.errors?.professionalExp}
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
					<ViewResultAsTable
						items={form.values.professionalExp}
						handleRemove={handleRemoveProfessionalExp}
						handleEdit={handleEditProfessionalExp}
					/>
				</Box>
			)}
		</Box>
	);
}
