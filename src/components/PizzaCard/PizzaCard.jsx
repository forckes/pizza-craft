import React from 'react'
import PizzaCardBottom from '../PizzaCardBottom/PizzaCardBottom'

export default function PizzaCard({ title, price }) {
	return (
		<div class='pizza-block'>
			<img
				class='pizza-block__image'
				src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
				alt='Pizza'
			/>
			<h4 class='pizza-block__title'>{title}</h4>
			<div class='pizza-block__selector'>
				<ul>
					<li class='active'>тонка</li>
					<li>традиційна</li>
				</ul>
				<ul>
					<li class='active'>26 см.</li>
					<li>30 см.</li>
					<li>40 см.</li>
				</ul>
			</div>

			<PizzaCardBottom price={price} />
		</div>
	)
}
