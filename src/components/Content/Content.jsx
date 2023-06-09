import React from 'react'
import ContentTop from '../ContentTop/ContentTop'
import PizzaCard from '../PizzaCard/PizzaCard'

export default function Content({ pizzas }) {
	return (
		<div className='content'>
			<div className='container'>
				<ContentTop pizzas={pizzas} />
				<h2 className='content__title'>Всі піцци</h2>
				<div className='content__items'>
					{pizzas.map(({ imageUrl, name, price, id, sizes, types }) => (
						<PizzaCard
							key={id}
							imageUrl={imageUrl}
							title={name}
							price={price}
							sizes={sizes}
							types={types}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
