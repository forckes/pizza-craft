import React from 'react'
import Categories from '../Categories/Categories'
import Sort from '../Sort/Sort'

export default function ContentTop({ pizzas: { id, category } }) {
	return (
		<div className='content__top'>
			<Categories key={id} category={category} />

			<Sort />
		</div>
	)
}
