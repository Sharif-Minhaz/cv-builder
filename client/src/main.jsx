import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import store from "./store";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<MantineProvider>
				<Notifications />
				<App />
			</MantineProvider>
		</Provider>
	</StrictMode>
);
