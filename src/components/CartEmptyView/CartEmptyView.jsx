import React from "react";

import EmptyCartSvg from "../../assets/images/cart.svg";
import SadSmile from "../../assets/images/sadSmile.svg";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import { Link } from "react-router-dom";

export default function CartEmptyView() {
	return (
		<div className='content'>
			<div className='container container--cart'>
				<div className='cart cart--empty'>
					<h2>
						Корзина порожня
						<img height={45} width={45} src={SadSmile} alt='Empty Cart' />
					</h2>
					<p>
						Схоже, ви ще не замовили жодної піцци
						<br />
						Для того, щоб замовити піццу, перейдіть до главної сторінки.
					</p>
					<img className='cartImg' src={EmptyCartSvg} alt='Empty Cart' />
					<Link to='/' className='button button--black'>
						<span>
							<MdOutlineKeyboardBackspace size={26} />
							Повернутися назад
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
