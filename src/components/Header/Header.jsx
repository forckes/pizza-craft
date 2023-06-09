import React from 'react'
import { HiShoppingCart } from 'react-icons/hi'
import Logo from '../../assets/images/logo.svg'

export default function Header() {
	return (
		<div class='header'>
			<div class='container'>
				<div class='header__logo'>
					<img width='38' src={Logo} alt='Pizza logo' />
					<div>
						<h1>React Pizza</h1>
						<p>Найсмачніша піца у всесвіті</p>
					</div>
				</div>
				<div class='header__cart'>
					<a href='/cart.html' class='button button--cart'>
						<span>520 ₴</span>
						<div class='button__delimiter'></div>
						<HiShoppingCart size={22} />
						<span>3</span>
					</a>
				</div>
			</div>
		</div>
	)
}
