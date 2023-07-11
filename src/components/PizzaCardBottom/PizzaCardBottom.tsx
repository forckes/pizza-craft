import { FC } from "react";

//icon
import { HiOutlinePlus } from "react-icons/hi";

//interface
interface IPizzaBottom {
	price: number;
	count: number;
	onClickAdd: Function;
}

const PizzaCardBottom: FC<IPizzaBottom> = ({ price, count, onClickAdd }) => {
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
};
export default PizzaCardBottom;
