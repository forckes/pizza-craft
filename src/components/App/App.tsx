import { lazy, useState } from "react";

//styles
import "../../scss/app.scss";

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from "react-router-dom";

// components
import Header from "../Header/Header";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { ErrorView } from "../ErrorView/ErrorView";

//lazy pages components
const HomePage = lazy(() => import("../../pages/HomePage"));
const CartPage = lazy(() => import("../../pages/CartPage"));
const ItemPage = lazy(() => import("../../pages/ItemPage"));

function ErrorBoundary() {
	return <ErrorView />;
}

export default function App() {
	const [searchValue, setSearchValue] = useState("");

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				errorElement={<ErrorBoundary />}
				path='/'
				element={
					<Header searchValue={searchValue} setSearchValue={setSearchValue} />
				}
			>
				<Route
					errorElement={<ErrorBoundary />}
					index
					element={<HomePage searchValue={searchValue} />}
				/>

				<Route path='/pizza/:pizzaId' element={<ItemPage />} />

				<Route
					errorElement={<ErrorBoundary />}
					path='cart'
					element={<CartPage />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		)
	);
	return (
		<div className='wrapper'>
			<RouterProvider router={router} />
		</div>
	);
}
