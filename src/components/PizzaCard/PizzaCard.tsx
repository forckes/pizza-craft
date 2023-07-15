import { useState, useRef, FC } from "react";
import { Link } from "react-router-dom";

//components
import PizzaCardBottom from "../PizzaCardBottom/PizzaCardBottom";

//redux logic
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";

//additional lib
import { Id, toast } from "react-toastify";
import { IDataDispatch } from "../../types/dataItem.interface";

//pizzaTypes
export const pizzaTypes = ["тонке", "традиційне"];

interface IPizzaCard {
	id: string;
	imageUrl: string;
	title: string;
	price: number;
	sizes: number[];
	types: string[];
}

const PizzaCard: FC<IPizzaCard> = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types
}) => {
	const [activeTypeIdx, setActiveTypeIdx] = useState(0);
	const [activeSizeIdx, setActiveSizeIdx] = useState(0);

	const { count } = useTypedSelector(state =>
		state.cart.items.find(
			(obj: IDataDispatch) =>
				obj.id === id &&
				obj.type === types[activeTypeIdx] &&
				obj.size === sizes[activeSizeIdx]
		)
	) ?? { count: 0 };

	const dispatch = useDispatch();

	const toastId = useRef<Id>(null!);

	const notify = () => {
		if (!toast.isActive(toastId.current)) {
			toastId.current = toast.success(
				` *${title}*
				додана до корзини`
			);
		}
	};
	//funcs
	const onClickAdd = () => {
		const item = {
			id,
			imageUrl,
			title,
			price,
			size: sizes[activeSizeIdx],
			type: pizzaTypes[activeTypeIdx],
			count
		};
		dispatch(addItem(item));
		notify();
	};

	return (
		<div className='pizza-block'>
			<Link to={`pizza/${id}`}>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />

				<h4 className='pizza-block__title'>{title}</h4>
			</Link>
			<div className='pizza-block__selector'>
				<ul>
					{types.map((_type, idx) => (
						<li
							key={idx}
							onClick={() => setActiveTypeIdx(idx)}
							className={activeTypeIdx === idx ? "active" : ""}
						>
							{pizzaTypes[idx]}
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
};

export default PizzaCard;
