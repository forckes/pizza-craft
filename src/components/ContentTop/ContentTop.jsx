import React from "react";
import Categories from "../Categories/Categories";
import Sort from "../Sort/Sort";

export default function ContentTop() {
	return (
		<div className='content__top'>
			<Categories />
			<Sort />
		</div>
	);
}
