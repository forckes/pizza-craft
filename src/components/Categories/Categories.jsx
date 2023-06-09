import { useState } from 'react'

const CategoriesItems = [
	'Всі',
	"М'ясні",
	'Вегетаріанські',
	'Гриль',
	'Гостра',
	'Закриті',
]

export default function Categories({ category }) {
	const [activeCategoryIdx, setActiveCategoryIdx] = useState(0)

	const setActiveIdx = index => {
		setActiveCategoryIdx(index)
	}

	const makeOptionClassName = index => {
		const optionClasses = []

		if (index === activeCategoryIdx) {
			optionClasses.push('active')
		}
		return optionClasses.join(' ')
	}

	return (
		<div className='categories'>
			<ul>
				{CategoriesItems.map((item, idx) => (
					<li
						key={idx}
						onClick={() => setActiveIdx(idx)}
						className={makeOptionClassName(idx)}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}
