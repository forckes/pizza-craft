import React from "react";
import ReactDOM from "react-dom/client";
//App
import App from "./components/App/App";
//redux
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
//toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//persist
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>

			<ToastContainer position='top-center' autoClose={2000} />
		</Provider>
	</React.StrictMode>
);
