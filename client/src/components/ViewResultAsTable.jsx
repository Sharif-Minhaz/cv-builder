import { Box, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";

export default function ViewResultAsTable({ items, handleRemove, handleEdit }) {
	// Dynamically extract column names from the first item in the records
	const columns = items.length
		? Object.keys(items[0]).map((key) => ({
				accessor: key,
				title:
					key === "orgName"
						? "Organization Name"
						: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize column headers
				render: (record) => {
					// Check if the field is "role" to render HTML
					if (key === "role") {
						return <div dangerouslySetInnerHTML={{ __html: record[key] }} />;
					}

					if (key === "orgName") {
						// Append "(currently working)" if currentlyWorking is true
						return record.currentlyWorking ? `${record[key]} (Present)` : record[key];
					}
					// Default rendering for other fields
					return record[key];
				},
		  }))
		: [];

	// Add actions column
	columns.push({
		accessor: "actions",
		title: <Box mr={6}>Actions</Box>,
		textAlign: "right",
		render: (record, index) => (
			<Group key={index + Date.now()} gap={4} justify="right" wrap="nowrap">
				<Box onClick={() => handleEdit(index)} style={{ cursor: "pointer" }}>
					<IconEdit color="#228be6" size={17} />
				</Box>
				<Box onClick={() => handleRemove(index)} style={{ cursor: "pointer" }}>
					<IconTrash color="#ff4d4f" size={17} />
				</Box>
			</Group>
		),
	});

	return (
		<DataTable
			withTableBorder
			withColumnBorders
			columns={columns}
			records={items}
			styles={{
				header: {
					borderBottom: "2px solid #e0e0e0", // Customize the header row border
				},
			}}
		/>
	);
}
