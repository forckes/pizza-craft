import { useLoaderData } from "react-router-dom";

import ContentTop from "../components/ContentTop/ContentTop";
import PizzaCard from "../components/PizzaCard/PizzaCard";
import PizzaLoader from "../components/SkeletonLoaders/PizzaLoader";

import LazyLoad from "react-lazyload";

import { useSelector } from "react-redux";
import { getCategoryId } from "../redux/filterSlice";

export default function HomePage() {
	const pizzas = useLoaderData();

	const categoryId = useSelector(getCategoryId);

	return (
		<div className='content'>
			<div className='container'>
				<ContentTop pizzas={pizzas} />
				<h2 className='content__title'>Всі піцци</h2>
				<div className='content__items'>
					{pizzas.map(({ imageUrl, name, price, id, sizes, types }) => (
						<LazyLoad
							placeholder={<PizzaLoader key={id} />}
							debounce={300}
							once={true}
							key={id}
						>
							<PizzaCard
								key={id}
								imageUrl={imageUrl}
								title={name}
								price={price}
								sizes={sizes}
								types={types}
							/>
						</LazyLoad>
					))}
				</div>
			</div>
		</div>
	);
}

//fetch function
export const fetchPizzas = async () => {
	try {
		const response = await fetch(
			"https://6484615eee799e3216269b53.mockapi.io/items"
		);
		if (response.ok) {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		throw new Error(error);
	}
};
