import React, { useState, useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import Chat from './Chat';
import UserImg from '../common/UserImg';
import { ContactsContext } from '../context/ContactContext';

const ContactList = () => {
	const contactList = useContext(ContactsContext);
	const [contacts, setContacts] = useState();
	const [showThatChat, setShowThatChat] = useState(null);

	const onSearch = (searchStr) => {
		const filteredContacts = contactList.filter((contact) =>
			contact.name.toLowerCase().includes(searchStr.toLowerCase())
		);
		setContacts(filteredContacts);
	};

	useEffect(() => {
		contactList.sort((a, b) => {
			return new Date(b.lastMessage) - new Date(a.lastMessage);
		});
		setContacts(contactList);
	}, [contactList]);

	const cutLastMessage = (person) => {
		return person.chatHistory[person.chatHistory.length - 1].text.slice(0, 18);
	};

	return (
		<>
			<div className='chatList'>
				<SearchBar onSearch={onSearch} />
				<p className='title'>Chats</p>
				{contacts?.map((person) => {
					return (
						<div
							onClick={() => setShowThatChat(person.id)}
							key={person.id}
							className='friendsCard'
						>
							<UserImg userName={person.img} />
							<div>
								<p className='userName'>{person.name}</p>
								<p className='lastMessage'>{cutLastMessage(person)}</p>
							</div>
							<div className='lastMessageDate'>
								{person.lastMessage.slice(0, 12)}
							</div>
						</div>
					);
				})}
				{!contacts?.length && <p>No contacts found with that name</p>}
			</div>

			<Chat contactId={showThatChat} />
		</>
	);
};

export default ContactList;
