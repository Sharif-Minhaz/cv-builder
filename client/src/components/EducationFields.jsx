import { Button, Divider, Flex, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Eduction from "./Eduction";

export default function EducationFields({ addEducation, removeEducation, form }) {
	return (
		<>
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
		</>
	);
}
