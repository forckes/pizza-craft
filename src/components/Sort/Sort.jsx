import React from 'react'
import { TiArrowSortedUp } from 'react-icons/ti'

export default function Sort() {
	return (
		<div class='sort'>
			<div class='sort__label'>
				<TiArrowSortedUp size={20} />
				<b>Сортування по:</b>
				<span>популярності</span>
			</div>
			<div class='sort__popup'>
				<ul>
					<li class='active'>популярності</li>
					<li>ціні</li>
					<li>алфавіту</li>
				</ul>
			</div>
		</div>
	)
}
