import React from 'react'
import ContentTop from '../ContentTop/ContentTop'
import PizzaCard from '../PizzaCard/PizzaCard'

export default function Content() {
	return (
		<div class='content'>
			<div class='container'>
				<ContentTop />
				<h2 class='content__title'>Всі піцци</h2>
				<div class='content__items'>
					<PizzaCard title='Чізбургер-піцца' price={195} />
					<PizzaCard title='Сирна' price={250} />
					<PizzaCard title='Креветки по-азійському' price={360} />
				</div>
			</div>
		</div>
	)
}
