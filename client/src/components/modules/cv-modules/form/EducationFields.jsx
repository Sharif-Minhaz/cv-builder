import { Divider, Flex, Text } from "@mantine/core";
import Education from "../cv/Education";
import ErrorTooltip from "../../../common/ErrorTooltip";
import RequiredStar from "../../../common/RequiredStar";

export default function EducationFields({ form }) {
	return (
		<>
			<ErrorTooltip position="top-end" offset={-25} message={form.errors?.education}>
				<Flex align="center" justify="space-between" mt={32} mb={8}>
					<Text size="22px">
						Education <RequiredStar />
					</Text>
				</Flex>
			</ErrorTooltip>
			<Divider />
			<Education form={form} />
		</>
	);
}
