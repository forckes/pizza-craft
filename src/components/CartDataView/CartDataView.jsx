import React from "react";

import { BsCart4, BsTrash3 } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { Link } from "react-router-dom";

export default function CartDataView() {
	return (
		<div className='container container--cart'>
			<div className='cart__top'>
				<h2 className='content__title'>
					<BsCart4 className='cart-icon' size={35} />
					Корзина
				</h2>
				<div className='cart__clear'>
					<BsTrash3 size={20} className='trash-icon' color={"#37373d"} />
					<span>Очистити корзину</span>
				</div>
			</div>
			<div className='cart__items'>
				<div className='cart__item'>
					<div className='cart__item-img'>
						<img
							className='pizza-block__image'
							src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
							alt='Pizza'
						/>
					</div>
					<div className='cart__item-info'>
						<h3>Сырный цыпленок</h3>
						<p>тонке, 26 см.</p>
					</div>
					<div className='cart__item-count'>
						<button type='button' className='cart__item-count-circle'>
							<FiMinusCircle size={30} />
						</button>
						<b>2</b>
						<button type='button' className='cart__item-count-circle'>
							<FiPlusCircle size={30} fontWeight={500} />
						</button>
					</div>
					<div className='cart__item-price'>
						<b>520 ₴</b>
					</div>
					<button type='button' className='cart__item-remove'>
						<div className='button--remove'>
							<IoMdClose size={20} />
						</div>
					</button>
				</div>
			</div>
			<div className='cart__bottom'>
				<div className='cart__bottom-details'>
					<span>
						Всього піцц: <b>3 шт.</b>
					</span>
					<span>
						Сумма замовлення: <b>520 ₴</b>
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
}
