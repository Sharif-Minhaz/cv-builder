import { Text, Group, Box, Button, Image, Flex, rem } from "@mantine/core";
import { IconLogout, IconZoom } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData, selectAuthValue } from "../store/auth/authSlice";
import { Menu } from "@mantine/core";
import { useDoLogoutMutation } from "../store/api/authSliceApi";
import { notifications } from "@mantine/notifications";
import { clearDataFromStore, selectCvValue } from "../store/cv/cvSlice";
import ThemeButton from "./ThemeButton";

const server_url = import.meta.env.VITE_BASE_URL;

export function Navbar() {
	const [doLogout, { isLoading }] = useDoLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectAuthValue);
	const cv = useSelector(selectCvValue);

	const handleLogout = async () => {
		try {
			const response = await doLogout().unwrap();
			if (response.success) {
				notifications.show({
					title: "Success",
					message: "Logout successful",
					color: "green",
				});
				navigate("/auth/login");
				dispatch(clearAuthData());
				dispatch(clearDataFromStore());
				localStorage.removeItem("cv");
				localStorage.removeItem("auth");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box
			component="header"
			bg="white"
			height={70}
			p="md"
			pos="fixed"
			display="flex"
			w="100%"
			top={0}
			left={0}
			style={{ zIndex: 1000, boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px" }}
		>
			<Flex justify="space-between" w="100%">
				<Link to="/" style={{ textDecoration: "none" }}>
					<Group spacing="xl" style={{ height: "100%" }}>
						<Box>
							<Image src="/brand.png" width={25} height={25} />
						</Box>
						<Text
							component="span"
							variant="gradient"
							gradient={{ from: "indigo", to: "cyan", deg: 45 }}
							size="xl"
							fw="bold"
							ml={-10}
						>
							CV Builder
						</Text>
					</Group>
				</Link>
				<Flex gap={15} align="center">
					{/* ------- Theme button ---------- */}
					<ThemeButton />
					<Box
						component="a"
						href="https://drive.google.com/file/d/100mML6ULl19DKwrNqmebDm8hPlANxYv9/view"
						target="_blank"
						rel="noreferrer"
						visibleFrom="sm"
						display="flex"
						td="none"
					>
						<Button size="sm" c="white" bg="#228be6" fw={500}>
							<IconZoom size={18} stroke={1.5} style={{ marginRight: 5 }} /> Example
						</Button>
					</Box>
					{user ? (
						<Menu
							width={200}
							position="bottom-end"
							withArrow
							shadow="md"
							offset={10}
							transition="pop-top-right"
							zIndex={9999}
						>
							<Menu.Target style={{ cursor: "pointer" }}>
								<Avatar
									src={`${server_url}/uploads/${cv?.profileImage}`}
									color="cyan"
									radius="xl"
									bd={"1px solid #dfdfdf"}
								>
									{user?.username?.charAt(0).toUpperCase()}
								</Avatar>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Label>{user?.username}</Menu.Label>
								<Menu.Item
									disabled={isLoading}
									onClick={handleLogout}
									leftSection={
										<IconLogout style={{ width: rem(14), height: rem(14) }} />
									}
								>
									Logout
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					) : (
						<Link to="/auth/login" style={{ textDecoration: "none", color: "#228be6" }}>
							Login
						</Link>
					)}
				</Flex>
			</Flex>
		</Box>
	);
}
