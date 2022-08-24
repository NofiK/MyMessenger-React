import ContactList from './components/ContactList';
import { useEffect, useState } from 'react';
import { ContactsContext } from './context/ContactContext';
import { db } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

function App() {
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		const q = query(collection(db, 'contacts'));
		const unsub = onSnapshot(q, (querySnapshot) => {
			const contactsObj = querySnapshot.docs[0].data();
			setContacts(Object.values(contactsObj));
		});
		return () => unsub();
	}, []);

	return (
		<ContactsContext.Provider value={contacts}>
			<div className='App'>
				<ContactList />
			</div>
		</ContactsContext.Provider>
	);
}

export default App;
