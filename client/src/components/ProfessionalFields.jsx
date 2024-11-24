import { Button, Divider, Flex, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import ProfessionalExperience from "./ProfessionalExperience";

export default function ProfessionalFields({ addProfessionalExp, removeProfessionalExp, form }) {
	return (
		<>
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
		</>
	);
}
