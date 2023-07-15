import React, { FC } from "react";

//components
import CartItemCard from "../CartItemCard/CartItemCard";

//icons
import { BsCart4, BsTrash3 } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

//react router-dom
import { Link } from "react-router-dom";

//redux logic
import { useDispatch } from "react-redux";
import { clearItems, getItemsList, getTotalPrice } from "../../redux/cartSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";

//interface
import { IDataCartItem } from "../../types/dataItem.interface";

const CartDataView: FC<{}> = () => {
	const dispatch = useDispatch();

	const CartItems = useTypedSelector(getItemsList);
	const totalPrice = useTypedSelector(getTotalPrice);
	const totalCount = CartItems.reduce(
		(sum: number, item: { count: number }) => sum + item.count,
		0
	);

	return (
		<div className='container container--cart'>
			<div className='cart__top'>
				<h2 className='content__title'>
					<BsCart4 className='cart-icon' size={35} />
					Корзина
				</h2>
				<div className='cart__clear'>
					<BsTrash3 size={20} className='trash-icon' color={"#37373d"} />
					<button type='button' onClick={() => dispatch(clearItems())}>
						Очистити корзину
					</button>
				</div>
			</div>
			<div className='cart__items'>
				{CartItems.map(
					({ id, imageUrl, title, price, size, type }: IDataCartItem) => (
						<CartItemCard
							key={id}
							id={id}
							imageUrl={imageUrl}
							title={title}
							price={price}
							size={size}
							type={type}
						/>
					)
				)}
			</div>
			<div className='cart__bottom'>
				<div className='cart__bottom-details'>
					<span>
						Всього піцц: <b>{totalCount}</b>
					</span>
					<span>
						Сумма замовлення: <b>{totalPrice} ₴</b>
					</span>
				</div>
				<div className='cart__bottom-buttons'>
					<Link to='/' className='button button--black go-back-btn'>
						<span>
							<MdOutlineKeyboardBackspace size={20} />
							Назад
						</span>
					</Link>
					<div className='button pay-btn'>
						<span>Оплатить сейчас</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartDataView;
