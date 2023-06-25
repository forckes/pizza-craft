import { HiShoppingCart } from "react-icons/hi";
import Logo from "../../assets/images/logo.svg";
import { NavLink, Outlet } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

import { getItemsList, getTotalPrice } from "../../redux/cartSlice";
import { useSelector } from "react-redux";

export default function Header({ setSearchValue, searchValue }) {
	const items = useSelector(getItemsList);
	const totalPrice = useSelector(getTotalPrice);
	const totalCount = items.reduce((sum, item) => sum + item.count, 0);

	return (
		<>
			<div className='header'>
				<div className='container'>
					<NavLink to='/' className='header__logo'>
						<img width='38' src={Logo} alt='Pizza logo' />
						<div>
							<h1>React Pizza</h1>
							<p>Найсмачніша піца у всесвіті</p>
						</div>
					</NavLink>
					<div className='header__searchBox'>
						<SearchBox
							searchValue={searchValue}
							setSearchValue={setSearchValue}
						/>
					</div>
					<div className='header__cart'>
						<NavLink to='/cart' className='button button--cart'>
							<span>{totalPrice} ₴</span>
							<div className='button__delimiter'></div>
							<HiShoppingCart size={22} />
							<span>{totalCount}</span>
						</NavLink>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
}
