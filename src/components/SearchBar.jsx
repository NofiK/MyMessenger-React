import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import UserImg from '../common/UserImg';

const SearchBar = ({ onSearch }) => {
	return (
		<section className='header'>
			<UserImg userName='person' />
			<div className='searchBar'>
				<input
					onChange={(e) => onSearch(e.target.value)}
					placeholder='Search or start new chat'
					type='text'
				/>
				<AiOutlineSearch className='findIcon' />
			</div>
		</section>
	);
};

export default SearchBar;
