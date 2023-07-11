import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzasApi = createApi({
	reducerPath: "pizzas",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://6484615eee799e3216269b53.mockapi.io/items"
	}),
	endpoints: builder => ({
		getPizzas: builder.query({
			query: ({ sort, categoryId, searchValue, currentPage }) => {
				const sortBy = sort.sortProperty.replace("-", "");
				const order = sort.sortProperty.includes("-") ? "asc" : "desc";
				const category = categoryId > 0 ? `category=${categoryId}` : "";
				const search = searchValue !== "" ? `search=${searchValue}` : "";
				let limit = 4;
				if (window.innerWidth <= 1400) {
					limit = 3;
				}
				const url = `?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortBy}&order=${order}&${search}`;
				return { url };
			}
		}),
		getPizza: builder.query({
			query: pizzaId => `/${pizzaId}`
		}),
		getPizzasNumber: builder.query({
			query: ({ sort, categoryId, searchValue, currentPage }) => {
				const sortBy = sort.sortProperty.replace("-", "");
				const order = sort.sortProperty.includes("-") ? "asc" : "desc";
				const category = categoryId > 0 ? `category=${categoryId}` : "";
				const search = searchValue !== "" ? `search=${searchValue}` : "";

				const url = `?page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}&${search}`;
				return { url };
			}
		})
	})
});

export const { useGetPizzasQuery, useGetPizzaQuery, useGetPizzasNumberQuery } =
	pizzasApi;
