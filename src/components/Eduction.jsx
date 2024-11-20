import { Button, Grid, TextInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export default function Eduction({ form, removeEducation, index }) {
	return (
		<Grid mt={10}>
			<Grid.Col span={3}>
				<TextInput
					withAsterisk
					label="Organization Name"
					placeholder="ABC"
					{...form.getInputProps(`education.${index}.orgName`)}
				/>
			</Grid.Col>
			<Grid.Col span={3}>
				<TextInput
					withAsterisk
					label="Duration"
					placeholder="2001-2005"
					{...form.getInputProps(`education.${index}.duration`)}
				/>
			</Grid.Col>
			<Grid.Col span={3}>
				<TextInput
					withAsterisk
					label="Subject Title"
					placeholder="SWE"
					{...form.getInputProps(`education.${index}.title`)}
				/>
			</Grid.Col>
			<Grid.Col span={2}>
				<TextInput
					withAsterisk
					label="Grade"
					placeholder="4.00"
					{...form.getInputProps(`education.${index}.grade`)}
				/>
			</Grid.Col>
			{index !== 0 && (
				<Grid.Col span={1}>
					<Button mt={24} bg="red" onClick={() => removeEducation(index)}>
						<IconTrash />
					</Button>
				</Grid.Col>
			)}
		</Grid>
	);
}
