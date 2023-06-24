import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ContentTop from "../components/ContentTop/ContentTop";
import PizzaCard from "../components/PizzaCard/PizzaCard";
import PizzaLoader from "../components/SkeletonLoaders/PizzaLoader";
import PizzaPagination from "../components/Pagination/Pagination";

import { sortItems } from "../components/Sort/Sort";

import LazyLoad from "react-lazyload";
import LoadingBar from "react-top-loading-bar";
import qs from "qs";

import { useSelector, useDispatch } from "react-redux";
import { getCategoryId, getSort, getCurrentPage } from "../redux/filterSlice";
import { setCurrentPage, setFilters, initialState } from "../redux/filterSlice";

const BASE_URL = "https://6484615eee799e3216269b53.mockapi.io/items";

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
	//important!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// import { getCustomers } from "../fakeApi.js";
	// import { useState, useEffect, useMemo, Suspense } from "react";
	// import SearchBox from "components/SearchBox.jsx";
	// import { useLocation, useSearchParams } from "react-router-dom";
	// import { Box } from "../components/Box/Box";
	// import { Link } from "react-router-dom";

	// export default function Customers() {
	// 	const [customers, setCustomers] = useState([]);
	// 	const [searchParams, setSearchParams] = useSearchParams();
	// 	const filterParam = searchParams.get("filter") ?? "";
	// 	const location = useLocation();

	// 	useEffect(() => {
	// 		getCustomers(customers).then(setCustomers);
	// 	}, [customers]);

	// 	const ChangeFilter = value => {
	// 		setSearchParams(value !== "" ? { filter: value } : {});
	// 	};

	// 	const visibleCustomers = useMemo(() => {
	// 		return customers.filter(customer =>
	// 			customer.name.toLowerCase().includes(filterParam.toLowerCase())
	// 		);
	// 	}, [customers, filterParam]);

	// 	return (
	// 		<Box
	// 			as='main'
	// 			display='center'
	// 			flexDirection='column'
	// 			algnItems='center'
	// 			justifyContent='center'
	// 		>
	// 			<Suspense fallback={<h1>Loading ...</h1>}>
	// 				<SearchBox value={filterParam} onChange={ChangeFilter} />
	// 				{visibleCustomers.length > 0 &&
	// 					visibleCustomers.map(({ id, name }) => (
	// 						<li type='none' key={id}>
	// 							<Link state={{ from: location }} to={`${id}`}>
	// 								{name}
	// 							</Link>
	// 						</li>
	// 					))}
	// 			</Suspense>
	// 		</Box>
	// 	);
	// }

	const handlePageChange = (event, newPage) => {
		dispatch(setCurrentPage(newPage));
	};

	const fetchPizzas = async () => {
		try {
			const sortBy = sort.sortProperty.replace("-", "");
			const order = sort.sortProperty.includes("-") ? "asc" : "desc";

			const category = categoryId > 0 ? `category=${categoryId}` : "";

			const search = searchValue !== "" ? `search=${searchValue}` : "";

			let limit = 4;
			if (window.innerWidth <= 1400) {
				limit = 3;
			}

			const response = await fetch(
				`${BASE_URL}?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortBy}&order=${order}&${search}`
			);
			if (response.ok) {
				console.log("FETCH"); //here
				const data = await response.json();
				setPizzas(data);
				setProgress(progress + 100);
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			if (
				initialState.categoryId === Number(params.categoryId) &&
				initialState.selectedSort === params.selectedSort &&
				initialState.currentPage === Number(params.currentPage)
			) {
				fetchPizzas();
			}

			const sort = sortItems.find(
				obj => obj.sortProperty === params.sortProperty
			);

			dispatch(setFilters({ ...params, sort }));

			isSearch.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
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
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			});

			navigate(`?${queryString}`);
		}

		isMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, currentPage, sort.sortProperty]);

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
		</div>
	);
}
