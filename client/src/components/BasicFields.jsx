import { em, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import TextInputBox from "./TextInputBox";
import PhoneInputBox from "./PhoneInputBox";
import NumberInputBox from "./NumberInputBox";

export default function BasicFields({ form }) {
	const isTablet = useMediaQuery(`(max-width: ${em(768)})`);

	return (
		<>
			<Grid>
				{/* full name field */}
				<Grid.Col span={isTablet ? 12 : 6}>
					<TextInputBox
						form={form}
						name="fname"
						label="Full Name"
						placeholder="John Doe"
					/>
				</Grid.Col>
				<Grid.Col span={isTablet ? 12 : 6}>
					<NumberInputBox
						form={form}
						name="expectedSalary"
						label="Your Expected Salary (BDT)"
						placeholder="10,000"
					/>
				</Grid.Col>
				{/* Designation field */}
				<Grid.Col span={isTablet ? 12 : 6}>
					<TextInputBox
						form={form}
						name="designation"
						label="Your Designation"
						placeholder="Full Stack Developer"
					/>
				</Grid.Col>
				{/* email address field */}
				<Grid.Col span={isTablet ? 12 : 6}>
					<TextInputBox
						form={form}
						name="email"
						label="Your Email Address"
						placeholder="demo@gmail.com"
					/>
				</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col pos="relative" span={isTablet ? 12 : 6}>
					{/* phone number field */}
					<PhoneInputBox
						form={form}
						name="mobile"
						label="Your Phone number"
						placeholder="Your phone"
					/>
				</Grid.Col>
				<Grid.Col span={isTablet ? 12 : 6}>
					{/* github link */}
					<TextInputBox
						form={form}
						name="github"
						label="Your github link"
						placeholder="https://github.com/Sharif-Minhaz"
					/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={isTablet ? 12 : 6}>
					{/* linked in link */}
					<TextInputBox
						form={form}
						name="linkedIn"
						label="Your linkedin profile link"
						placeholder="https://www.linkedin.com/in/minhaz-sharif-614724205"
					/>
				</Grid.Col>
				<Grid.Col span={isTablet ? 12 : 6}>
					{/* website link here */}
					<TextInputBox
						form={form}
						name="website"
						label="Your website link"
						placeholder="https://minhazsharif.netlify.app/"
					/>
				</Grid.Col>
			</Grid>
		</>
	);
}
