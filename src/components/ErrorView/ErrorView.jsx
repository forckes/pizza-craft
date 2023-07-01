import React from "react";

export default function ErrorView({ error }) {
	return (
		<div>
			<h1>Error!</h1>
			<br />
			<h1>Sorry, pizzas is unavailable now</h1>
			<br />
			{error && <p>Error: {error}</p>}
		</div>
	);
}
