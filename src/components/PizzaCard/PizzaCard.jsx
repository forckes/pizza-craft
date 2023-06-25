import { useState } from "react";
import PizzaCardBottom from "../PizzaCardBottom/PizzaCardBottom";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";

//pizzaTypes
export const pizzaTypes = ["тонке", "традиційне"];
//

export default function PizzaCard({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types
}) {
	const [activeTypeIdx, setActiveTypeIdx] = useState(0);
	const [activeSizeIdx, setActiveSizeIdx] = useState(0);

	const { count } = useSelector(
		state => state.cart.items.find(obj => obj.id === id) || {}
	);

	const dispatch = useDispatch();

	const onClickAdd = () => {
		const item = {
			id,
			imageUrl,
			title,
			price,
			size: sizes[activeSizeIdx],
			type: pizzaTypes[activeTypeIdx]
		};
		dispatch(addItem(item));
	};

	return (
		<div className='pizza-block'>
			<img className='pizza-block__image' src={imageUrl} alt='Pizza' />

			<h4 className='pizza-block__title'>{title}</h4>
			<div className='pizza-block__selector'>
				<ul>
					{types.map((type, idx) => (
						<li
							key={idx}
							onClick={() => setActiveTypeIdx(idx)}
							className={activeTypeIdx === idx ? "active" : ""}
						>
							{pizzaTypes[type]}
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, idx) => (
						<li
							key={idx}
							onClick={() => setActiveSizeIdx(idx)}
							className={activeSizeIdx === idx ? "active" : ""}
						>
							{size} см.
						</li>
					))}
				</ul>
			</div>

			<PizzaCardBottom count={count} onClickAdd={onClickAdd} price={price} />
		</div>
	);
}
