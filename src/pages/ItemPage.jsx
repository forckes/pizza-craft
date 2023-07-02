import { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { HiOutlinePlus } from "react-icons/hi";

import { useGetPizzaQuery } from "../services/pizzas";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";

import ErrorView from "../components/ErrorView/ErrorView";

import { CategoriesItems } from "../components/Categories/Categories";
import { pizzaTypes } from "../components/PizzaCard/PizzaCard";

export default function ItemPage() {
	const { pizzaId } = useParams();

	const [progress, setProgress] = useState(0);
	const [activeTypeIdx, setActiveTypeIdx] = useState(0);
	const [activeSizeIdx, setActiveSizeIdx] = useState(0);

	const dispatch = useDispatch();

	const toastId = useRef(null);

	const {
		data = {},
		currentData,
		error,
		isFetching,
		isError,
		isSuccess
	} = useGetPizzaQuery(pizzaId, {
		refetchOnReconnect: true
	});

	const { id, name, imageUrl, types, sizes, price, rating, category } = data;

	const notify = () => {
		if (!toast.isActive(toastId.current)) {
			toastId.current = toast.success(
				` *${name}*
				додана до корзини`,
				{
					hideProgressBar: false,
					position: "top-right"
				}
			);
		}
	};

	const onClickAdd = () => {
		const item = {
			id,
			imageUrl,
			title: name,
			price,
			size: sizes[activeSizeIdx],
			type: pizzaTypes[activeTypeIdx]
		};
		dispatch(addItem(item));
		notify();
	};

	const { count } = useSelector(
		state =>
			state.cart.items.find(obj => {
				return (
					obj.id === id &&
					obj.type === pizzaTypes[activeTypeIdx] &&
					obj.size === sizes[activeSizeIdx]
				);
			}) || {}
	);

	return (
		<div className='pizzaPage'>
			<div className='container'>
				<LoadingBar
					color='#fe5f1e'
					progress={progress}
					onLoaderFinished={() => setProgress(0)}
					shadow={true}
					height={5}
					transitionTime={700}
				/>
				{isFetching && !currentData ? <h1>Skeleton</h1> : ""}
				{isSuccess && (
					<div className='pizzaPage__content'>
						<div className='pizzaPage__asideImg'>
							<img className='pizzaPage__img' src={imageUrl} alt={name} />
						</div>
						<div className='pizzaPage__asideContent'>
							<h2 className='pizzaPage__title'>{name}</h2>
							<div className='pizzaPage__info'>
								<p className='pizzaPage__infoItem'>
									Категорія:
									<span> {CategoriesItems[category]}</span>
								</p>
								<div className='pizza-block__selector'>
									<div className='pizzaPage__selectorBox'>
										<p>Вид тіста</p>
										<ul className='pizzaPage__infoItem'>
											{types.map((type, idx) => (
												<li
													key={idx}
													onClick={() => setActiveTypeIdx(idx)}
													className={activeTypeIdx === idx ? "active" : ""}
												>
													{pizzaTypes[type]}
												</li>
											))}
										</ul>
									</div>
									<div className='pizzaPage__selectorBox'>
										<ul
											className='
									pizzaPage__infoItem'
										>
											{sizes.map((size, idx) => (
												<li
													key={idx}
													onClick={() => setActiveSizeIdx(idx)}
													className={activeSizeIdx === idx ? "active" : ""}
												>
													{size} см.
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className='pizzaPage__bottom'>
								<div className='pizzaPage__bottom__price'>{price} ₴</div>
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
						</div>
					</div>
				)}
				{isError && <ErrorView error={error} />}
			</div>
		</div>
	);
}
