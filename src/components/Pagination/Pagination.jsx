import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PizzaPagination({ currentPage, handlePageChange }) {
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
}
