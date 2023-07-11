import React, { FC, ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";

const PizzaPagination: FC<{
	currentPage: number;
	handlePageChange: (event: ChangeEvent<unknown>, newPage: number) => void;
}> = ({ currentPage, handlePageChange }) => {
	return (
		<div>
			<Pagination
				className='pagination'
				color='standard'
				count={3}
				shape='rounded'
				size='large'
				page={currentPage}
				onChange={handlePageChange}
			/>
		</div>
	);
};

export default PizzaPagination;
