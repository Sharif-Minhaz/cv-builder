import { Grid, TextInput } from "@mantine/core";
import { IMaskInput } from "react-imask";

export default function BasicFields({ form }) {
	return (
		<>
			<Grid>
				{/* full name field */}
				<Grid.Col span={12}>
					<TextInput
						withAsterisk
						label="Full Name"
						placeholder="John Doe"
						key={form.key("fname")}
						mt={8}
						{...form.getInputProps("fname")}
					/>
				</Grid.Col>
				{/* Designation field */}
				<Grid.Col span={6}>
					<TextInput
						withAsterisk
						label="Your Designation"
						placeholder="designation"
						key={form.key("designation")}
						mt={8}
						{...form.getInputProps("designation")}
					/>
				</Grid.Col>
				{/* email address field */}
				<Grid.Col span={6}>
					<TextInput
						withAsterisk
						label="Your Email Address"
						placeholder="john@gmail.com"
						key={form.key("email")}
						mt={8}
						{...form.getInputProps("email")}
					/>
				</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={6}>
					{/* phone number field */}
					<TextInput
						component={IMaskInput}
						withAsterisk
						label="Your Phone number"
						mask="01000000000"
						placeholder="Your phone"
						mt={8}
						{...form.getInputProps("mobile")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					{/* github link */}
					<TextInput
						withAsterisk
						label="Your github link"
						key={form.key("github")}
						mt={8}
						placeholder="https://github.com/Sharif-Minhaz"
						{...form.getInputProps("github")}
					/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={6}>
					{/* linked in link */}
					<TextInput
						withAsterisk
						label="Your linked in link"
						key={form.key("linkedIn")}
						mt={8}
						placeholder="https://www.linkedin.com/in/minhaz-sharif-614724205"
						{...form.getInputProps("linkedIn")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					{/* website link here */}
					<TextInput
						withAsterisk
						label="Your website link"
						key={form.key("website")}
						mt={8}
						{...form.getInputProps("website")}
					/>
				</Grid.Col>
			</Grid>
		</>
	);
}
