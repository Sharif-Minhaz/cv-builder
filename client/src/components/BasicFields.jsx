import { em, Grid, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import TooltipInfo from "./TooltipInfo";
import ErrorTooltip from "./ErrorTooltip";

export default function BasicFields({ form }) {
	const isTablet = useMediaQuery(`(max-width: ${em(768)})`);

	return (
		<>
			<Grid>
				{/* full name field */}
				<Grid.Col span={12}>
					<ErrorTooltip message={form.errors?.fname}>
						<TextInput
							withAsterisk
							label="Full Name"
							placeholder="John Doe"
							key={form.key("fname")}
							mt={8}
							rightSection={<TooltipInfo info="Enter your full name" />}
							{...form.getInputProps("fname")}
							error={!!form.errors?.fname}
						/>
					</ErrorTooltip>
				</Grid.Col>
				{/* Designation field */}
				<Grid.Col span={isTablet ? 12 : 6}>
					<ErrorTooltip message={form.errors?.designation}>
						<TextInput
							withAsterisk
							label="Your Designation"
							placeholder="Full Stack Developer"
							key={form.key("designation")}
							mt={8}
							rightSection={<TooltipInfo info="Enter your designation" />}
							{...form.getInputProps("designation")}
							error={!!form.errors.designation}
						/>
					</ErrorTooltip>
				</Grid.Col>
				{/* email address field */}
				<Grid.Col span={isTablet ? 12 : 6}>
					<ErrorTooltip message={form.errors?.email}>
						<TextInput
							withAsterisk
							label="Your Email Address"
							placeholder="john@gmail.com"
							key={form.key("email")}
							mt={8}
							rightSection={<TooltipInfo info="Enter your email address" />}
							{...form.getInputProps("email")}
							error={!!form.errors.email}
						/>
					</ErrorTooltip>
				</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col pos="relative" span={isTablet ? 12 : 6}>
					{/* phone number field */}
					<ErrorTooltip message={form.errors?.mobile}>
						<TextInput
							withAsterisk
							label="Your Phone number"
							mask="01000000000"
							placeholder="Your phone"
							mt={8}
							rightSection={<TooltipInfo info="Enter your phone number" />}
							{...form.getInputProps("mobile")}
							error={!!form.errors.mobile}
						/>
					</ErrorTooltip>
				</Grid.Col>
				<Grid.Col span={isTablet ? 12 : 6}>
					{/* github link */}
					<ErrorTooltip message={form.errors?.github}>
						<TextInput
							withAsterisk
							label="Your github link"
							key={form.key("github")}
							mt={8}
							placeholder="https://github.com/Sharif-Minhaz"
							rightSection={<TooltipInfo info="Enter your github link" />}
							{...form.getInputProps("github")}
							error={!!form.errors.github}
						/>
					</ErrorTooltip>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={isTablet ? 12 : 6}>
					{/* linked in link */}
					<ErrorTooltip message={form.errors?.linkedIn}>
						<TextInput
							withAsterisk
							label="Your linked in link"
							key={form.key("linkedIn")}
							mt={8}
							placeholder="https://www.linkedin.com/in/minhaz-sharif-614724205"
							rightSection={<TooltipInfo info="Enter your linked in link" />}
							{...form.getInputProps("linkedIn")}
							error={!!form.errors.linkedIn}
						/>
					</ErrorTooltip>
				</Grid.Col>
				<Grid.Col span={isTablet ? 12 : 6}>
					{/* website link here */}
					<ErrorTooltip message={form.errors?.website}>
						<TextInput
							withAsterisk
							label="Your website link"
							key={form.key("website")}
							mt={8}
							rightSection={<TooltipInfo info="Enter your website link" />}
							{...form.getInputProps("website")}
							error={!!form.errors.website}
						/>
					</ErrorTooltip>
				</Grid.Col>
			</Grid>
		</>
	);
}
