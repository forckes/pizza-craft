import { useState } from 'react'
import { TiArrowSortedUp } from 'react-icons/ti'

const sortItems = ['популярності', 'ціні', 'алфавіту']

export default function Sort() {
	const [toggleSort, setToggleSort] = useState(false)
	const [activeSortItem, setActiveSortItem] = useState(0)

	return (
		<div className='sort'>
			<button
				type='button'
				onClick={() => setToggleSort(!toggleSort)}
				className='sort__label'
			>
				<TiArrowSortedUp size={20} />
				<b>Сортування по:</b>
				<span>{sortItems[activeSortItem]}</span>
			</button>
			{toggleSort && (
				<div className='sort__popup'>
					<ul>
						{sortItems.map((item, idx) => (
							<li
								onClick={() => setActiveSortItem(idx) || setToggleSort(false)}
								key={idx}
								className={activeSortItem === idx ? 'active' : ''}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
