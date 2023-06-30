import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import ContentTop from "../components/ContentTop/ContentTop";
import PizzaCard from "../components/PizzaCard/PizzaCard";
import PizzaLoader from "../components/SkeletonLoaders/PizzaLoader";
import PizzaPagination from "../components/Pagination/Pagination";
import { sortItems } from "../components/Sort/Sort";

//additional libs
import LazyLoad from "react-lazyload";
import LoadingBar from "react-top-loading-bar";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getCategoryId, getSort, getCurrentPage } from "../redux/filterSlice";
import { setCurrentPage, setFilters, initialState } from "../redux/filterSlice";

export default function HomePage({ searchValue }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const [pizzas, setPizzas] = useState([]);
	const [progress, setProgress] = useState(0);

	const categoryId = useSelector(getCategoryId);
	const sort = useSelector(getSort);
	const currentPage = useSelector(getCurrentPage);

	//functions
	const handlePageChange = (event, newPage) => {
		dispatch(setCurrentPage(newPage));
	};

	//fetch pizzas func

	//useEffects
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			if (
				initialState.categoryId === Number(params.categoryId) &&
				initialState.sort?.sortProperty === params.sortProperty &&
				initialState.currentPage === Number(params.currentPage)
			) {
				fetchPizzas();
			}

			const sort = sortItems.find(
				obj => obj?.sortProperty === params.sortProperty
			);

			dispatch(setFilters({ ...params, sort }));

			isSearch.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		if (categoryId !== 0) {
			dispatch(setCurrentPage(1));
		}

		setProgress(progress + 35);
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, searchValue, sort.sortProperty, currentPage]);

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort?.sortProperty,
				categoryId,
				currentPage
			});

			navigate(`?${queryString}`);
		}

		isMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, currentPage, sort.sortProperty]);

	//return
	return (
		<div className='content'>
			<div className='container'>
				{progress !== 0 ? (
					<LoadingBar
						color='#fe5f1e'
						progress={progress}
						onLoaderFinished={() => setProgress(0)}
						shadow={true}
						height={5}
						transitionTime={700}
					/>
				) : (
					""
				)}

				<ContentTop pizzas={pizzas} />

				<h2 className='content__title'>Всі піци</h2>
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
								id={id}
								imageUrl={imageUrl}
								title={name}
								price={price}
								sizes={sizes}
								types={types}
							/>
						</LazyLoad>
					))}
				</div>
				{categoryId === 0 ? (
					<PizzaPagination
						currentPage={currentPage}
						handlePageChange={handlePageChange}
					/>
				) : (
					""
				)}
			</div>
			<ToastContainer autoClose={2000} />
		</div>
	);
}
