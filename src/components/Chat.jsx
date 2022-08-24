import React, { useState, useContext, useEffect, useRef } from 'react';
import UserImg from '../common/UserImg';
import axios from 'axios';
import { MdOutlineSend } from 'react-icons/md';
import { GrSend } from 'react-icons/gr';
import { formatAMPM, justDate } from '../helpers/dateGenerator';
import { ContactsContext } from '../context/ContactContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const Chat = ({ contactId }) => {
	const contactList = useContext(ContactsContext);
	const contactsRef = doc(db, 'contacts', 'ZSslG1yZRWDTi9W14yJG');
	const myRef = useRef();
	const [newMessage, setNewMessage] = useState('');
	const [currentChat, setCurrentChat] = useState(null);

	const sendMessageByEnter = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	const sendMessage = async () => {
		if (newMessage !== '') {
			deliverMyMessage();
			scrollToLastMessage();
			getFriendResponse();
		} else {
			alert('Type something at the field');
		}
	};

	const getFriendResponse = () => {
		setTimeout(async () => {
			await updateDoc(contactsRef, {
				[`${currentChat.id}.chatHistory`]: arrayUnion(
					createNewMessage(await fetchJoke(), 'friend')
				),
			});
			scrollToLastMessage();
		}, 10000);
	};

	const deliverMyMessage = async () => {
		await updateDoc(contactsRef, {
			[`${currentChat.id}.chatHistory`]: arrayUnion(
				createNewMessage(newMessage, 'me')
			),
			[`${currentChat.id}.lastMessage`]: justDate(Date.now()),
		});
		setNewMessage('');
	};

	const fetchJoke = async () => {
		const response = await axios.get('https://api.chucknorris.io/jokes/random');
		return response.data.value;
	};

	const createNewMessage = (text, from) => {
		return {
			friend: from === 'friend',
			text,
			time: formatAMPM(new Date()),
			id: Date.now(),
		};
	};

	const scrollToLastMessage = () => {
		myRef?.current?.scrollIntoView({ block: 'end' });
	};

	useEffect(() => {
		scrollToLastMessage();
		const chat = contactList.find((contact) => contact.id === contactId);
		setCurrentChat(chat);
	}, [contactId, contactList, currentChat]);

	return (
		<section className='chatSection'>
			{currentChat && (
				<>
					<div className='chatInfo'>
						<UserImg userName={currentChat.img} />
						<p>{currentChat.name}</p>
					</div>
					<section className='chat'>
						{currentChat.chatHistory.map((dialog) => (
							<div
								ref={myRef}
								key={dialog.id}
								className={dialog.friend ? 'friend' : 'you'}
							>
								{dialog.friend && (
									<UserImg noMark={true} userName={currentChat.img} />
								)}
								<div>
									<p className='message'>{dialog.text}</p>
									<p className='postedTime'>{dialog.time}</p>
								</div>
							</div>
						))}
					</section>
					<div className='sendMessageDiv'>
						<input
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							placeholder='Type your message'
							type='text'
							onKeyDown={sendMessageByEnter}
						/>
						<MdOutlineSend onClick={sendMessage} className='sendBtn' />
					</div>
				</>
			)}
			{!currentChat && (
				<div className='startChatPage'>
					<GrSend className='messageIcon' />
					<h1>Your messages</h1>
					<h3>Send private messages to a friend.</h3>
				</div>
			)}
		</section>
	);
};

export default Chat;
