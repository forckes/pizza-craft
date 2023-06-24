import { lazy, useState } from "react";

import "../../scss/app.scss";

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from "react-router-dom";
import Header from "../Header/Header";

const HomePage = lazy(() => import("../../pages/HomePage"));
const CartPage = lazy(() => import("../../pages/CartPage"));

export default function App() {
	const [searchValue, setSearchValue] = useState("");

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path='/'
				element={
					<Header searchValue={searchValue} setSearchValue={setSearchValue} />
				}
			>
				<Route index element={<HomePage searchValue={searchValue} />} />
				<Route path='cart' element={<CartPage />} />
			</Route>
		)
	);
	return (
		<div className='wrapper'>
			<RouterProvider router={router} />
		</div>
	);
}
