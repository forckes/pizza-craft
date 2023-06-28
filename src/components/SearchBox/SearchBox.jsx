import { useState, useCallback } from "react";

// import throttle from "lodash.throttle";
import debounce from "lodash.debounce";

import { GoSearch } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

export default function SearchBox({ setSearchValue }) {
	const [value, setValue] = useState("");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateSearchValue = useCallback(
		debounce(value => setSearchValue(value), 450),
		[setSearchValue]
	);

	const onChange = e => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<div className='searchBox'>
			<GoSearch size={17} color={"#7b7b7b"} className='searchBox__search' />
			<input
				placeholder='Пошук піци...'
				className='searchBox__input'
				type='text'
				name='search'
				onChange={onChange}
				value={value}
			/>
			<button
				onClick={() => setSearchValue("") || setValue("")}
				className='searchBox__remove'
				type='button'
			>
				<IoMdClose size={18} />
			</button>
		</div>
	);
}
