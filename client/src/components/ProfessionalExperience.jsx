import { Box, Button, Grid, TextInput } from "@mantine/core";
import RichTextEditorComponent from "./RichTextEditorComponent";
import { IconTrash } from "@tabler/icons-react";

export default function ProfessionalExperience({ removeProfExp, form, index }) {
	const handleRoleChange = (value) => {
		form.setFieldValue(`professionalExp.${index}.role`, value);
	};

	return (
		<Grid mt={10}>
			<Grid.Col span={4}>
				<TextInput
					withAsterisk
					label="Organization Name"
					placeholder="ABC"
					{...form.getInputProps(`professionalExp.${index}.orgName`)}
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<TextInput
					withAsterisk
					label="Duration"
					placeholder="Jul 10 - Dec 10"
					{...form.getInputProps(`professionalExp.${index}.duration`)}
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<TextInput
					withAsterisk
					label="Designation"
					placeholder="Software Engineer"
					{...form.getInputProps(`professionalExp.${index}.designation`)}
				/>
			</Grid.Col>
			<Grid.Col span={12}>
				<Box mb={14} style={{ fontSize: "14px" }}>
					Describe Role
				</Box>
				<RichTextEditorComponent
					onChange={handleRoleChange}
					value={form.values?.professionalExp[index].role}
					placeholder="Describe professional experience"
				/>
			</Grid.Col>
			{index !== 0 && (
				<Grid.Col span={1}>
					<Button bg="red" onClick={() => removeProfExp(index)}>
						<IconTrash />
					</Button>
				</Grid.Col>
			)}
		</Grid>
	);
}
