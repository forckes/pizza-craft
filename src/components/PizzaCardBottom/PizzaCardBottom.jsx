import { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'

export default function PizzaCardBottom({ price }) {
	const [quantity, setQuantity] = useState(0)
	const [clicked, setClicked] = useState(false)
	return (
		<div class='pizza-block__bottom'>
			<div class='pizza-block__price'>
				{clicked ? `${price * quantity} ₴` : `від ${price} ₴`}
			</div>
			<button
				onClick={() => setQuantity(quantity + 1) || setClicked(true)}
				type='button'
				class='button button--outline button--add'
			>
				<HiOutlinePlus size={24} />
				<span>Додати</span>
				<i>{quantity}</i>
			</button>
		</div>
	)
}
