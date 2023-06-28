import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
	return (
		<div id='notfound'>
			<div class='notfound'>
				<div class='notfound-404'>
					<h1>
						4<span></span>4
					</h1>
				</div>
				<h2>Ойй! Сторінки не знайдено</h2>
				<p>
					Вибачте, але сторінка, яку ви шукаєте, не існує, або її було видалено
				</p>
				<Link to='/'>На головну</Link>
			</div>
		</div>
	);
}
