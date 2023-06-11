import { lazy, Suspense } from "react";

import "../../scss/app.scss";

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from "react-router-dom";
import Header from "../Header/Header";

import { fetchPizzas } from "../../pages/HomePage";

const HomePage = lazy(() => import("../../pages/HomePage"));
const CartPage = lazy(() => import("../../pages/CartPage"));

const Root = () => {
	return (
		<>
			<Header />
		</>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route index element={<HomePage />} loader={fetchPizzas} />
			<Route path='cart' element={<CartPage />} />
		</Route>
	)
);

export default function App() {
	return (
		<div className='wrapper'>
			<RouterProvider router={router} />
		</div>
	);
}
