import React, { FC } from "react";

import CartDataView from "../components/CartDataView/CartDataView";
import CartEmptyView from "../components/CartEmptyView/CartEmptyView";

import { getItemsList } from "../redux/cartSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";

const CartPage: FC = () => {
	const cartItems = useTypedSelector(getItemsList);

	return <>{cartItems.length === 0 ? <CartEmptyView /> : <CartDataView />}</>;
};
export default CartPage;
