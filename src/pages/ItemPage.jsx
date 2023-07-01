import React from "react";
import { useParams } from "react-router-dom";

import { useGetPizzaQuery } from "../services/pizzas";

export default function ItemPage() {
	const { pizzaId } = useParams();

	const {
		data = {},
		currentData,
		error,
		isFetching,
		isError,
		isSuccess
	} = useGetPizzaQuery(pizzaId, {
		refetchOnReconnect: true
	});

	const { id, name, imageUrl, types, sizes, price, rating, category } = data;

	return <div className='container'>{isSuccess && <h2>{name}</h2>}</div>;
}
