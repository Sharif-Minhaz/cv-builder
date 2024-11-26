import { useState } from "react";
import { Button, Grid, TextInput, Box, Text, em } from "@mantine/core";
import { IconPlus, IconCheck } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import EducationList from "./EducationList";
import TooltipInfo from "./TooltipInfo";
import ErrorTooltip from "./ErrorTooltip";

export default function Education({ form }) {
	const isMediumDevice = useMediaQuery(`(max-width: ${em(950)})`);
	const isEducationError = !!form.errors?.education;

	const [educationInput, setEducationInput] = useState({
		orgName: "",
		duration: "",
		title: "",
		grade: "",
	});

	const [editIndex, setEditIndex] = useState(-1);

	// Handle input changes
	const handleChange = (field) => (event) => {
		setEducationInput({
			...educationInput,
			[field]: event.target.value,
		});
	};

	// Add or update education entry
	const handleAddEducation = () => {
		const { orgName, duration, title, grade } = educationInput;

		if (orgName.trim() && duration.trim() && title.trim() && grade.trim()) {
			if (editIndex === -1) {
				// Add a new entry
				form.insertListItem("education", { orgName, duration, title, grade });
				form.clearFieldError("education");
			} else {
				// Update an existing entry
				form.setFieldValue(`education.${editIndex}`, {
					orgName,
					duration,
					title,
					grade,
				});
				setEditIndex(-1); // Reset edit state
			}

			// Reset input fields
			setEducationInput({ orgName: "", duration: "", title: "", grade: "" });
		} else {
			alert("Please fill all fields!");
		}
	};

	// Edit an existing education entry
	const handleEditEducation = (index) => {
		setEducationInput(form.values.education[index]);
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
			<Box>
				{/* Input Form */}
				<Grid mt={10}>
					<Grid.Col span={isMediumDevice ? 6 : 3}>
						<TextInput
							withAsterisk
							label="Organization Name"
							placeholder="ABC"
							value={educationInput.orgName}
							rightSection={<TooltipInfo info="Organization Name" />}
							onChange={handleChange("orgName")}
							error={isEducationError}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 6 : 3}>
						<TextInput
							withAsterisk
							label="Duration"
							placeholder="2001-2005"
							value={educationInput.duration}
							rightSection={<TooltipInfo info="Education duration" />}
							onChange={handleChange("duration")}
							error={isEducationError}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 6 : 3}>
						<TextInput
							withAsterisk
							label="Subject Title"
							placeholder="SWE"
							value={educationInput.title}
							rightSection={<TooltipInfo info="Subject title" />}
							onChange={handleChange("title")}
							error={isEducationError}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 6 : 2}>
						<TextInput
							withAsterisk
							label="Grade"
							placeholder="4.00"
							value={educationInput.grade}
							rightSection={<TooltipInfo info="Grade point" />}
							onChange={handleChange("grade")}
							error={isEducationError}
						/>
					</Grid.Col>
					<Grid.Col span={isMediumDevice ? 12 : 1}>
						{/* checking if the state is editing mode or add mode */}
						{editIndex === -1 ? (
							<Button
								mt={isMediumDevice ? 0 : 24}
								color="green"
								onClick={handleAddEducation}
							>
								<IconPlus />
							</Button>
						) : (
							<Button
								mt={isMediumDevice ? 0 : 24}
								color="teal"
								onClick={handleAddEducation}
							>
								<IconCheck />
							</Button>
						)}
					</Grid.Col>
				</Grid>

				{/* Education List */}
				{form.values.education.length > 0 && (
					<Box mt={20}>
						<Text size="lg" weight={500} mb={10}>
							Education List
						</Text>
						{form.values.education?.map((education, index) => (
							<EducationList
								handleEditEducation={handleEditEducation}
								handleRemoveEducation={handleRemoveEducation}
								key={index}
								index={index}
								education={education}
							/>
						))}
					</Box>
				)}
			</Box>
		</ErrorTooltip>
	);
}
