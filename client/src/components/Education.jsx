import { useState } from "react";
import { Button, Grid, Box, Text, em } from "@mantine/core";
import { IconPlus, IconCheck } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import ErrorTooltip from "./ErrorTooltip";
import BaseTextInputBox from "./BaseTextInputBox";
import ViewResultAsTable from "./ViewResultAsTable";
import IMaskBaseField from "./IMaskBaseField";
import DateInputBox from "./DateInputBox";
import { convertDateToString, convertStringToDate } from "../utils";

export default function Education({ form }) {
	const isMediumDevice = useMediaQuery(`(max-width: ${em(950)})`);
	const isEducationError = !!form.errors?.education;

	const [educationInput, setEducationInput] = useState({
		orgName: "",
		duration: [null, null],
		title: "",
		grade: "",
	});

	const [editIndex, setEditIndex] = useState(-1);

	// Handle input changes
	const handleChange = (field) => (event) => {
		if (field === "duration") {
			setEducationInput({
				...educationInput,
				[field]: event,
			});
			return;
		}

		setEducationInput({
			...educationInput,
			[field]: event.target.value,
		});
	};

	// Add or update education entry
	const handleAddEducation = () => {
		const { orgName, duration, title, grade } = educationInput;

		if (orgName.trim() && duration.length && title.trim() && grade.trim()) {
			if (editIndex === -1) {
				// Add a new entry
				form.insertListItem("education", {
					orgName,
					duration: convertDateToString(duration),
					title,
					grade,
				});
				form.clearFieldError("education");
			} else {
				// Update an existing entry
				form.replaceListItem("education", editIndex, {
					orgName,
					duration: convertDateToString(duration),
					title,
					grade,
				});
				setEditIndex(-1); // Reset edit state
			}

			// Reset input fields
			setEducationInput({ orgName: "", duration: [null, null], title: "", grade: "" });
		} else {
			alert("Please fill all fields!");
		}
	};

	// Edit an existing education entry
	const handleEditEducation = (index) => {
		const selectedEducation = form.values?.education?.[index];
		setEducationInput({
			...selectedEducation,
			duration: convertStringToDate(selectedEducation?.duration),
		});
		setEditIndex(index);
	};

	// Remove an education entry
	const handleRemoveEducation = (index) => {
		form.removeListItem("education", index);

		// If the current editing entry is being removed, reset input fields
		if (editIndex === index) {
			setEducationInput({ orgName: "", duration: "", title: "", grade: "" });
			setEditIndex(-1);
		}
	};

	return (
		<ErrorTooltip error={form.errors?.education}>
			<Box id="educations">
				{/* Input Form */}
				<Grid mt={10}>
					<Grid.Col span={isMediumDevice ? 6 : 3}>
						<BaseTextInputBox
							label="Organization Name"
							placeholder="ABC"
							value={educationInput.orgName}
							isError={isEducationError}
							handleChange={handleChange("orgName")}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 6 : 3}>
						{/* Duration field */}
						<DateInputBox
							placeholder="Pick years range"
							label="Duration Years"
							error={isEducationError}
							handleChange={handleChange("duration")}
							value={educationInput.duration}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 6 : 3}>
						{/* Subject Title field */}
						<BaseTextInputBox
							label="Subject Title"
							placeholder="SWE"
							value={educationInput.title}
							isError={isEducationError}
							handleChange={handleChange("title")}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 6 : 2}>
						{/* Grade field */}
						<IMaskBaseField
							label="Grade"
							placeholder="4.00"
							mask={/^[0-9.]*$/}
							value={educationInput.grade}
							isError={isEducationError}
							handleChange={handleChange("grade")}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 12 : 1}>
						{/* Check if in edit or add mode */}
						<Button
							mt={isMediumDevice ? 0 : 24}
							color={editIndex === -1 ? "green" : "teal"}
							onClick={handleAddEducation}
						>
							{editIndex === -1 ? <IconPlus /> : <IconCheck />}
						</Button>
					</Grid.Col>
				</Grid>

				{/* Education List */}
				{form.values?.education.length > 0 && (
					<Box mt={20}>
						<Text size="lg" weight={500} mb={10}>
							Education List
						</Text>
						<ViewResultAsTable
							items={form.values.education}
							handleEdit={handleEditEducation}
							handleRemove={handleRemoveEducation}
						/>
					</Box>
				)}
			</Box>
		</ErrorTooltip>
	);
}
