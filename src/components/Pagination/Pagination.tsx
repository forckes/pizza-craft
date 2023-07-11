import React, { FC, ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import { IData } from "../../types/data.interface";

const PizzaPagination: FC<{
	currentPage: number;
	handlePageChange: (event: ChangeEvent<unknown>, newPage: number) => void;
	pizzasNumberData: IData[];
}> = ({ currentPage, handlePageChange, pizzasNumberData }) => {
	const itemsPerPage = 4;
	const totalItems = pizzasNumberData.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return (
		<div>
			<Pagination
				className='pagination'
				color='standard'
				count={totalPages}
				shape='rounded'
				size='large'
				page={currentPage}
				onChange={handlePageChange}
			/>
		</div>
	);
};

export default PizzaPagination;
