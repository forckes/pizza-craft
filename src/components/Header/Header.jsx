import React from 'react'
import { HiShoppingCart } from 'react-icons/hi'
import Logo from '../../assets/images/logo.svg'

export default function Header() {
	return (
		<div className='header'>
			<div className='container'>
				<div className='header__logo'>
					<img width='38' src={Logo} alt='Pizza logo' />
					<div>
						<h1>React Pizza</h1>
						<p>Найсмачніша піца у всесвіті</p>
					</div>
				</div>
				<div className='header__cart'>
					<a href='/cart.html' className='button button--cart'>
						<span>520 ₴</span>
						<div className='button__delimiter'></div>
						<HiShoppingCart size={22} />
						<span>3</span>
					</a>
				</div>
			</div>
		</div>
	)
}
