import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

const FIELDS = {
	NAME: 'name',
	ROOM: 'room',
};

const Main = () => {
	const { NAME, ROOM } = FIELDS;
	const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' });

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};
	const handleClick = (e) => {
		const isDisabled = Object.values(values).some((value) => !value);
		console.log(isDisabled);
		if (isDisabled) e.preventDefault();
	};

	console.log(values);

	return (
		<section className='main'>
			<div className='main__container'>
				<h1 className='main__title'>Hello!</h1>

				<form className='main__form'>
					<div className='main__bar'>
						<input
							type='text'
							name='name'
							placeholder='Username'
							value={values[NAME]}
							className='main__input'
							autoComplete='off'
							required
							onChange={handleChange}
						/>
					</div>
					<div className='main__bar'>
						<input
							type='text'
							name='room'
							placeholder='Room'
							value={values[ROOM]}
							className='main__input'
							autoComplete='off'
							required
							onChange={handleChange}
						/>
					</div>
					<Link
						onClick={handleClick}
						className='main__link'
						to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
					>
						<button type='submit' className='main__button'>
							Join
						</button>
					</Link>
				</form>
			</div>
		</section>
	);
};

export default Main;
