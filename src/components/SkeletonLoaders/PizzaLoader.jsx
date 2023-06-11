import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoader = props => (
	<ContentLoader
		className='pizza-block'
		speed={1.6}
		width={290}
		height={490}
		viewBox='0 0 290 490'
		backgroundColor='#ece8e8'
		foregroundColor='#f2f6f6'
		{...props}
	>
		<circle cx='148' cy='131' r='130' />
		<rect x='7' y='278' rx='0' ry='0' width='280' height='24' />
		<rect x='7' y='317' rx='4' ry='4' width='280' height='78' />
		<rect x='129' y='419' rx='25' ry='25' width='160' height='48' />
		<rect x='6' y='425' rx='0' ry='0' width='102' height='40' />
	</ContentLoader>
);

export default PizzaLoader;
