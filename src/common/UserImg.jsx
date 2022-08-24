import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const UserImg = (props) => {
	const picture = require(`../UsersImgs/${props.userName}.png`);
	return (
		<div className='imgBox'>
			<img src={picture} alt='' />
			{!props.noMark && <AiOutlineCheckCircle className='checkMark' />}
		</div>
	);
};

export default UserImg;
