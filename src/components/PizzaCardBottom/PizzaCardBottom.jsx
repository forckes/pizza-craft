import { HiOutlinePlus } from "react-icons/hi";

export default function PizzaCardBottom({ price, count, onClickAdd }) {
	return (
		<div className='pizza-block__bottom'>
			<div className='pizza-block__price'>{price} ₴</div>
			<button
				onClick={() => onClickAdd()}
				type='button'
				className='button button--outline button--add'
			>
				<HiOutlinePlus size={24} />
				<span>Додати</span>
				<i>{count === undefined ? 0 : count}</i>
			</button>
		</div>
	);
}
