import React from 'react';

import './Messages.css';

const Messages = ({ messages, name }) => {
	return (
		<ul className='messages'>
			{messages.map(({ user, message }, i) => {
				const isUser = user.name.trim().toLowerCase() === name.trim().toLowerCase();
				const className = isUser ? 'messages__isUser' : 'messages__notUser';

				return (
					<li className={`messages__item ${className}`} key={i}>
						<span className='messages__name'>{user.name}</span>

						<div className='messages__text'>{message}</div>
					</li>
				);
			})}
		</ul>
	);
};

export default Messages;
