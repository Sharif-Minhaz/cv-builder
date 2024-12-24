import { Divider, Flex, Text } from "@mantine/core";
import ProfessionalExperience from "../cv/ProfessionalExperience";
import ErrorTooltip from "../../../common/ErrorTooltip";
import RequiredStar from "../../../common/RequiredStar";

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
