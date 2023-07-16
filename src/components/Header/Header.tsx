import { HiShoppingCart } from "react-icons/hi";
import Logo from "../../assets/images/logo.svg";
import { NavLink, Outlet } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

import { getItemsList } from "../../redux/cartSlice";
import { FC, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getCartCountAndTotalPrice } from "../../redux/getCartCount";

const Header: FC<{ setSearchValue: Function; searchValue: string }> = ({
	setSearchValue,
	searchValue
}) => {
	const CartItems = useTypedSelector(getItemsList);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(CartItems));
	}, [CartItems]);

	const { count, totalPrice } = useTypedSelector(getCartCountAndTotalPrice);

	return (
		<>
			<div className='header'>
				<div className='container'>
					<NavLink to='/' className='header__logo'>
						<img width='38' src={Logo} alt='Pizza logo' />
						<div>
							<h1>PizzaCraft</h1>
							<p>Найсмачніша піца у всесвіті</p>
						</div>
					</NavLink>
					<div className='header__searchBox'>
						<SearchBox setSearchValue={setSearchValue} />
					</div>
					<div className='header__cart'>
						<NavLink to='/cart' className='button button--cart'>
							<span>{totalPrice} ₴</span>
							<div className='button__delimiter'></div>
							<HiShoppingCart size={22} />
							<span>{count}</span>
						</NavLink>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
};
export default Header;
