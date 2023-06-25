import React from "react";
import CartDataView from "../components/CartDataView/CartDataView";
import CartEmptyView from "../components/CartEmptyView/CartEmptyView";

import { useSelector } from "react-redux";
import { getItemsList } from "../redux/cartSlice";

export default function CartPage() {
	const cartItems = useSelector(getItemsList);

	return <>{cartItems.length === 0 ? <CartEmptyView /> : <CartDataView />}</>;
}
