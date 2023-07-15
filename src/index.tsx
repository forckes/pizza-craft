import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
//App
import App from "./components/App/App";
//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
//toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//loader
import { Oval } from "react-loader-spinner";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Suspense
			fallback={
				<Oval
					height={180}
					width={180}
					color='#ff4d00'
					wrapperStyle={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "700px"
					}}
					wrapperClass=''
					visible={true}
					ariaLabel='oval-loading'
					secondaryColor='#f57f0996'
					strokeWidth={3}
					strokeWidthSecondary={3}
				/>
			}
		>
			<Provider store={store}>
				<App />

				<ToastContainer position='top-center' autoClose={2000} />
			</Provider>
		</Suspense>
	</React.StrictMode>
);
