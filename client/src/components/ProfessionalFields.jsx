import { Divider, Flex, Text } from "@mantine/core";
import ProfessionalExperience from "./ProfessionalExperience";
import ErrorTooltip from "./ErrorTooltip";
import RequiredStar from "./RequiredStar";

export default function ProfessionalFields({ addProfessionalExp, removeProfessionalExp, form }) {
	return (
		<>
			<ErrorTooltip message={form.errors?.professionalExp} offset={-25}>
				<Flex id="professional-exp" align="center" justify="space-between" mt={32} mb={8}>
					<Text size="22px">
						Professional Experiences <RequiredStar />
					</Text>
				</Flex>
			</ErrorTooltip>
			<Divider />

			<ProfessionalExperience
				removeProfExp={removeProfessionalExp}
				form={form}
				addProfessionalExp={addProfessionalExp}
			/>
		</>
	);
}
