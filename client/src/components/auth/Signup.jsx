import { Button, Checkbox, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import AuthWrapper from "../auth/AuthWrapper";
import PasswordInputBox from "../modules/cv-modules/form/PasswordInputBox";
import TextInputBox from "../modules/cv-modules/form/TextInputBox";
import ErrorTooltip from "../common/ErrorTooltip";
import { Link, useNavigate } from "react-router-dom";
import { useDoSignupMutation } from "../../store/api/authSliceApi";
import { notifications } from "@mantine/notifications";

export default function Signup() {
	const [doSignup, { isLoading }] = useDoSignupMutation();
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			termsOfService: false,
		},

		validate: {
			username: (value) =>
				value.trim().length >= 3 ? null : "Username must be at least 3 characters long",
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) =>
				value.length >= 6 ? null : "Password must be at least 6 characters long",
			confirmPassword: (value, values) =>
				value === values.password ? null : "Passwords do not match",
			termsOfService: (value) => (value ? null : "You must agree to the terms of service"),
		},
	});

	const handleSubmit = async (values) => {
		try {
			const response = await doSignup(values).unwrap();

			if (response.success) {
				notifications.show({
					title: "Success",
					message: "Signup successful",
					color: "green",
				});
				navigate("/auth/login");
			} else {
				const err = response.data?.message;
				notifications.show({
					title: "Error",
					message: err,
					color: "red",
				});
			}
		} catch (error) {
			const err = error.data?.message || error.message;
			notifications.show({
				title: "Error",
				message: err,
				color: "red",
			});
			console.error(error);
		}
	};

	return (
		<AuthWrapper label="Signup">
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInputBox
					form={form}
					name="username"
					label="Username"
					placeholder="Your username"
				/>

				<TextInputBox form={form} name="email" label="Email" placeholder="your@email.com" />

				<PasswordInputBox
					form={form}
					name="password"
					label="Password"
					placeholder="Your password"
				/>

				<PasswordInputBox
					form={form}
					name="confirmPassword"
					label="Confirm Password"
					placeholder="Confirm your password"
				/>

				<ErrorTooltip
					position="top-start"
					offset={{ mainAxis: 8, crossAxis: 0 }}
					message={form.errors?.termsOfService}
				>
					<Checkbox
						mt={12}
						label="I agree to the terms of service"
						{...form.getInputProps("termsOfService")}
						error={!!form.errors?.termsOfService}
					/>
				</ErrorTooltip>

				<Text mt="20px" size="14px" c="#3d3d3d">
					Already logged in?
					<Link
						to="/auth/login"
						style={{
							marginLeft: "5px",
							textDecoration: "none",
							color: "#1e88e5",
						}}
					>
						Login now
					</Link>
				</Text>

				<Group justify="flex-end" mt="md">
					<Button loading={isLoading} type="submit">
						Signup
					</Button>
				</Group>
			</form>
		</AuthWrapper>
	);
}
