import React from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import EmojiPicker from 'emoji-picker-react';
import Messages from '../Messages/Messages';

import './Chat.css';

const socket = io.connect('https://chat-room-zpu8.onrender.com');
const Chat = () => {
	const [state, setState] = useState([]);
	const [params, setParams] = useState({ room: '', user: '' });
	const [message, setMessage] = useState('');
	// const [isOpen, setOpen] = useState(false);
	const [users, setUsers] = useState(0);
	const { search } = useLocation();
	const navigate = useNavigate();

	const leftRoom = () => {
		socket.emit('leftRoom', { params });
		navigate('/');
	};
	const handleChange = ({ target: { value } }) => setMessage(value);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!message) return;

		socket.emit('sendMessage', { message, params });
		setMessage('');
	};
	// const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit('join', searchParams);
	}, [search]);

	useEffect(() => {
		socket.on('message', ({ data }) => {
			console.log(data);
			setState((_state) => [..._state, data]);
		});
	}, []);

	useEffect(() => {
		socket.on('room', ({ data: { users } }) => {
			setUsers(users.length);
		});
	}, []);

	return (
		<section className='chat'>
			<div className='chat__header'>
				<div className='chat__room-name'>{params.room}</div>
				<div className='chat__qty'>{users} users in room</div>
				<button className='chat__button-exit' onClick={leftRoom}></button>
			</div>
			<div className='chat__message'>
				<Messages messages={state} name={params.name} />
			</div>

			<form className='chat__form' onSubmit={handleSubmit}>
				<div className='chat__bar'>
					<input
						type='text'
						className='chat__input'
						name='message'
						placeholder='Writte here'
						value={message}
						autoComplete='off'
						required
						onChange={handleChange}
					/>
				</div>
				{/* <div className='chat__emoji'>
					<img src='' alt='emoji' onClick={() => setOpen(!isOpen)} />

					{isOpen && (
						<div className='chat__emoji-button'>
							<EmojiPicker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div> */}
				<button className='chat__button' type='submit' value='Send message'></button>
			</form>
		</section>
	);
};

export default Chat;
