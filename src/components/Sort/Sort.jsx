import { useRef, useState } from "react";

import { TiArrowSortedUp } from "react-icons/ti";

import { useDispatch, useSelector } from "react-redux";
import { getSort, setSort } from "../../redux/filterSlice";

import ClickAwayListener from "@mui/base/ClickAwayListener";

export const sortItems = [
	{ name: `популярності ↓`, sortProperty: "rating" },
	{
		name: `популярності ↑`,
		sortProperty: "-rating"
	},
	{ name: "ціні ↓", sortProperty: "price" },
	{ name: "ціні ↑", sortProperty: "-price" },
	{ name: "алфавіту ↓", sortProperty: "title" },
	{ name: "алфавіту ↑", sortProperty: "-title" }
];

export default function Sort() {
	const [toggleSort, setToggleSort] = useState(false);

	const dispatch = useDispatch();
	const sort = useSelector(getSort);

	const sortRef = useRef();

	const onClickListItem = obj => {
		dispatch(setSort(obj));
		setToggleSort(!toggleSort);
	};

	return (
		<ClickAwayListener onClickAway={() => setToggleSort(false)}>
			<div ref={sortRef} className='sort'>
				<button
					type='button'
					onClick={() => setToggleSort(!toggleSort)}
					className='sort__label'
				>
					<TiArrowSortedUp size={20} />
					<b>Сортування по:</b>
					<span>{sort.name}</span>
				</button>
				{toggleSort && (
					<div className='sort__popup'>
						<ul>
							{sortItems.map((obj, idx) => (
								<li
									onClick={() => onClickListItem(obj)}
									key={idx}
									className={
										sort.sortProperty === obj.sortProperty ? "active" : ""
									}
								>
									{obj.name}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</ClickAwayListener>
	);
}
