import { useState } from "react";
import { Text, Image, SimpleGrid, Group, rem, Box } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import ErrorTooltip from "./ErrorTooltip";
import RequiredStar from "./RequiredStar";
import { notifications } from "@mantine/notifications";
import { useUploadImageMutation, useDeleteImageMutation } from "../store/api/imageSliceApi";

const server_url = import.meta.env.VITE_BASE_URL;

export default function ImageDropzone({ form }) {
	const [uploadImage, { isLoading }] = useUploadImageMutation();
	const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();
	const [file, setFile] = useState(null);
	const [_, setUploading] = useState(false);
	const [uploadedUrl, setUploadedUrl] = useState(form.values?.profileImage);

	const previews = file ? (
		<Image
			draggable={false}
			fit
			w={{ base: rem(220), md: rem(220), sm: rem(180) }}
			src={URL.createObjectURL(file)}
			alt="Profile Preview"
			bd={"1px solid #dfdfdf"}
			onLoad={() => {
				URL.revokeObjectURL(URL.createObjectURL(file));
			}}
		/>
	) : uploadedUrl ? (
		<Image
			fit
			bd={"1px solid #dfdfdf"}
			w={{ base: rem(220), md: rem(220), sm: rem(180) }}
			draggable={false}
			src={`${server_url}/uploads/${uploadedUrl}`} // uploadedUrl
			alt="image"
		/>
	) : null;

	// const previews = ;

	const handleSetImage = async (files) => {
		const selectedFile = files[0];

		setFile(selectedFile);
		// Immediately upload the file
		try {
			setUploading(true);

			// Prepare the file data for upload
			const response = await uploadImage(selectedFile).unwrap();

			if (response.success) {
				setUploadedUrl(`${response.data?.filename}`); // Store the Cloudinary URL
				form.setFieldValue("profileImage", response.data?.filename); // Update the form with the Cloudinary URL
				notifications.show({
					title: "Upload Successful",
					message: "Profile image uploaded successfully!",
					color: "green",
				});
			} else {
				console.error("Upload failed:", response);
				notifications.show({
					title: "Upload Failed",
					message: "Failed to upload image. Please try again.",
					color: "red",
				});
			}
		} catch (error) {
			console.error("Error uploading:", error);
			notifications.show({
				title: "Upload Error",
				message: "An error occurred during upload. Please try again.",
				color: "red",
			});
		} finally {
			setUploading(false);
		}
	};

	const eraseImage = async () => {
		setFile(null);
		setUploadedUrl(null);
		form.setFieldValue("profileImage", null);

		// delete image from backend
		try {
			await deleteImage(form.values?.profileImage).unwrap();
			notifications.show({
				title: "Success",
				message: "Image deleted successfully",
				color: "green",
			});
		} catch (error) {
			console.error("Error deleting image:", error);
			notifications.show({
				title: "Error",
				message: "Failed to delete image. Please try again.",
				color: "red",
			});
		}
	};

	return (
		<div>
			<ErrorTooltip offset={-25} message={form.errors?.profileImage}>
				<Box mb={4} style={{ fontSize: "18px" }}>
					{/* <Text> */}
					Upload Image
					<RequiredStar />
					{/* </Text> */}
				</Box>
			</ErrorTooltip>
			{!file && !uploadedUrl ? (
				<Dropzone
					disabled={isLoading || isDeleting}
					onDrop={handleSetImage}
					onReject={(files) => console.log("rejected files", files)}
					maxFiles={1}
					multiple={false}
					maxSize={5 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					style={{
						border: form.errors?.profileImage
							? "1px solid #ff4444"
							: "1px solid #e3e3e3",
						borderRadius: "8px",
					}}
				>
					<Group
						justify="center"
						align="center"
						gap="xl"
						mih={220}
						style={{ pointerEvents: "none" }}
					>
						<Dropzone.Accept>
							<IconUpload
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-blue-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-red-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto
								style={{
									marginTop: rem(20),
									width: rem(85),
									height: rem(85),
									color: form.errors?.profileImage
										? "var(--mantine-color-red-5)"
										: "var(--mantine-color-blue-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text
								size="16px"
								inline
								ta="center"
								py={15}
								px="md"
								lh={1.4}
								c={form.errors?.profileImage ? "red" : "gray"}
							>
								Drag image here or click to select file
							</Text>
						</div>
					</Group>
				</Dropzone>
			) : (
				<SimpleGrid cols={{ base: 1, sm: 4 }}>
					<Box
						display="inline-block"
						bd={1}
						style={{ borderStyle: "solid", borderColor: "#e0e0e0" }}
						pos="relative"
					>
						{previews}
						<Box pos="absolute" top={1} right="7px">
							<IconX
								cursor={isLoading ? "not-allowed" : "pointer"}
								style={{
									width: rem(32),
									height: rem(32),
									color: isLoading ? "gray" : "var(--mantine-color-red-6)",
								}}
								stroke={1.5}
								onClick={isLoading ? undefined : eraseImage}
							/>
						</Box>
					</Box>
				</SimpleGrid>
			)}
		</div>
	);
}
