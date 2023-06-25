import React from "react";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import {
	addItem,
	minusItem,
	plusItem,
	removeItem
} from "../../redux/cartSlice";

export default function CartItemCard({
	id,
	imageUrl,
	title,
	price,
	size,
	type
}) {
	const dispatch = useDispatch();
	const { count } = useSelector(state =>
		state.cart.items.find(item => item.id === id)
	);
	// const plus = () => {
	// 	dispatch(addItem({ id }));
	// };

	return (
		<div className='cart__item'>
			<div className='cart__item-img'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			</div>
			<div className='cart__item-info'>
				<h3>{title}</h3>
				<p>
					{type}, {size}
				</p>
			</div>
			<div className='cart__item-count'>
				<button
					onClick={() => dispatch(minusItem({ id }))}
					type='button'
					className='cart__item-count-circle'
				>
					<FiMinusCircle size={30} />
				</button>
				<b>{count}</b>
				<button
					onClick={() => dispatch(plusItem({ id }))}
					type='button'
					className='cart__item-count-circle'
				>
					<FiPlusCircle size={30} fontWeight={500} />
				</button>
			</div>
			<div className='cart__item-price'>
				<b>{price * count} ₴</b>
			</div>
			<button
				onClick={() => dispatch(removeItem({ id }))}
				type='button'
				className='cart__item-remove'
			>
				<div className='button--remove'>
					<IoMdClose size={20} />
				</div>
			</button>
		</div>
	);
}
