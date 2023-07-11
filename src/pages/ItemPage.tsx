import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

//icons
import { HiOutlinePlus } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { CiPizza } from "react-icons/ci";
import { GiFullPizza } from "react-icons/gi";
import { BsListStars } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";

//redux logic
import { useGetPizzaQuery } from "../services/pizzas";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";

//additional libs
import LoadingBar from "react-top-loading-bar";
import { Id, toast } from "react-toastify";
import { Rating } from "@mui/material";

//components
import { ErrorView } from "../components/ErrorView/ErrorView";

//info from components
import { CategoriesItems } from "../components/Categories/Categories";
import { pizzaTypes } from "../components/PizzaCard/PizzaCard";

export interface IItem {
	id: string;
	imageUrl: string;
	title: string;
	price: number;
	type: string;
	size: number;
	count: number;
}

const ItemPage: React.FC<{}> = () => {
	const { pizzaId } = useParams<string>();

	const [progress, setProgress] = useState(0);
	const [activeTypeIdx, setActiveTypeIdx] = useState(0);
	const [activeSizeIdx, setActiveSizeIdx] = useState(0);

	const dispatch = useDispatch();

	const toastId = useRef<Id>(null!); //wow

	const {
		data = {},
		currentData,
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
				додана до корзини`
			);
		}
	};

	const { count } = useTypedSelector(state =>
		state.cart.items.find(
			obj =>
				obj.id === id &&
				obj.type === pizzaTypes[activeTypeIdx] &&
				obj.size === sizes[activeSizeIdx]
		)
	) ?? { count: 0 };

	const onClickAdd = () => {
		const item: IItem = {
			id,
			imageUrl,
			title: name,
			price,
			size: sizes[activeSizeIdx],
			type: pizzaTypes[activeTypeIdx],
			count
		};
		dispatch(addItem(item));
		notify();
	};

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
					<div className='pizzaPage__container'>
						<div className='pizzaPage__asideImg'>
							<img className='pizzaPage__img' src={imageUrl} alt={name} />
						</div>
						<div className='pizzaPage__content'>
							<h2 className='pizzaPage__title'>{name}</h2>
							<div className='pizzaPage__contentBox'>
								<div className='pizzaPage__userBox'>
									<div className='pizzaPage__rating'>
										<Rating
											className='pizzaPage__stars'
											name='half-rating-read'
											defaultValue={rating / 2}
											precision={0.5}
											size='large'
											readOnly
										/>
										<p>
											<BsListStars size={26} />
											{rating} / 10
										</p>
									</div>
									<div className='pizzaPage__payment'>
										<div className='pizzaPage__payment__price'>
											<FaMoneyBill size={50} /> {price} ₴
										</div>
										<button
											onClick={() => onClickAdd()}
											type='button'
											className='pizzaPage__payment__button'
										>
											<HiOutlinePlus size={24} />
											<span>Додати піцу</span>
											<i>{count === undefined ? 0 : count}</i>
										</button>
									</div>
								</div>
								<div className='pizzaPage__info'>
									<div className='pizzaPage__infoCategory'>
										<p className='pizzaPage__infoLabel'>
											<BiCategory size={28} />
											Категорія:
										</p>
										<span>{CategoriesItems[category]}</span>
									</div>
									<div className='pizzaPage__selector'>
										<div className='pizzaPage__infoItem'>
											<p className='pizzaPage__infoLabel'>
												<CiPizza size={34} />
												Вибрати вид тіста:
											</p>
											<ul className='pizzaPage__infoSelect'>
												{types.map((type: number, idx: number) => (
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
										<div className='pizzaPage__infoItem'>
											<p className='pizzaPage__infoLabel'>
												<GiFullPizza size={32} />
												Вибрати розмір піци:
											</p>

											<ul
												className='
									pizzaPage__infoSelect'
											>
												{sizes.map((size: number, idx: number) => (
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
							</div>
						</div>
					</div>
				)}
				{isError && <ErrorView />}
			</div>
		</div>
	);
};
export default ItemPage as React.FC;
