import { Box, Button, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import AuthWrapper from "../../AuthWrapper";
import PasswordInputBox from "../../PasswordInputBox";
import TextInputBox from "../../TextInputBox";
import { Link, useNavigate } from "react-router-dom";
import { useDoLoginMutation } from "../../../store/api/authSliceApi";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../store/auth/authSlice";

export default function Login() {
	const [doLogin, { isLoading }] = useDoLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) => (value.length >= 6 ? null : "Password required"),
		},
	});

	const handleSubmit = async (values) => {
		try {
			const response = await doLogin(values).unwrap();

			if (response.success) {
				notifications.show({
					title: "Success",
					message: "Login successful",
					color: "green",
				});
				dispatch(setAuthData(response.data));
				navigate("/");
			} else {
				const err = response.data?.message;
				notifications.show({
					title: "Error",
					message: err,
					color: "red",
				});
				form.setErrors({ email: err, password: err });
			}
		} catch (error) {
			const err = error.data?.message || error.message;
			notifications.show({
				title: "Error",
				message: err,
				color: "red",
			});
			console.error(error);
			form.setErrors({ email: err, password: err });
		}
	};

	return (
		<AuthWrapper label="Login">
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInputBox form={form} name="email" label="Email" placeholder="your@email.com" />
				<Box mt="10px" />
				<PasswordInputBox
					form={form}
					name="password"
					label="Password"
					placeholder="Your password"
				/>

				<Text mt="14px" size="14px" c="#3d3d3d">
					Don&apos;t have an account?
					<Link
						to="/auth/signup"
						style={{
							marginLeft: "5px",
							textDecoration: "none",
							color: "#1e88e5",
						}}
					>
						Signup now
					</Link>
				</Text>

				<Group justify="flex-end" mt="md">
					<Button loading={isLoading} type="submit">
						Login
					</Button>
				</Group>
			</form>
		</AuthWrapper>
	);
}
