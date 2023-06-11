import { useState } from "react";
import PizzaCardBottom from "../PizzaCardBottom/PizzaCardBottom";

//
const pizzaTypes = ["тонке", "традиційне"];
//

export default function PizzaCard({ title, price, imageUrl, sizes, types }) {
	const [activeTypeIdx, setActiveTypeIdx] = useState(0);
	const [activeSizeIdx, setActiveSizeIdx] = useState(0);

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

			<PizzaCardBottom price={price} />
		</div>
	);
}
