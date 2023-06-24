import { HiShoppingCart } from "react-icons/hi";
import Logo from "../../assets/images/logo.svg";
import { NavLink, Outlet } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

export default function Header({ setSearchValue, searchValue }) {
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
							<span>520 ₴</span>
							<div className='button__delimiter'></div>
							<HiShoppingCart size={22} />
							<span>3</span>
						</NavLink>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
}
