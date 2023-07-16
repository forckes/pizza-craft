import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../../redux/filterSlice";
import { getCategoryId } from "../../redux/filterSlice";

export const CategoriesItems = ["Всі", "М'ясні", "Сирні", "Гриль", "Гостра"];

export default function Categories() {
	const dispatch = useDispatch();
	const categoryId = useSelector(getCategoryId);

	const makeOptionClassName = (index: number) => {
		const optionClasses = [];

		if (index === categoryId) {
			optionClasses.push("active");
		}
		return optionClasses.join(" ");
	};

	return (
		<div className='categories'>
			<ul>
				{CategoriesItems.map((item, idx) => (
					<li
						key={idx}
						onClick={() => dispatch(setCategoryId(idx))}
						className={makeOptionClassName(idx)}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
