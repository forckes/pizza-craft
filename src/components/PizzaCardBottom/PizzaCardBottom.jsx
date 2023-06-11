import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

export default function PizzaCardBottom({ price }) {
	const [quantity, setQuantity] = useState(0);
	const [clicked, setClicked] = useState(false);

	return (
		<div className='pizza-block__bottom'>
			<div className='pizza-block__price'>
				{clicked ? `${price * quantity} ₴` : `${price} ₴`}
			</div>
			<button
				onClick={() => setQuantity(quantity + 1) || setClicked(true)}
				type='button'
				className='button button--outline button--add'
			>
				<HiOutlinePlus size={24} />
				<span>Додати</span>
				<i>{quantity}</i>
			</button>
		</div>
	);
}
