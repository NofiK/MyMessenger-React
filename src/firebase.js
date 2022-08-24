import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBQIk7G6w42-PRkck_2uCeocLj7TCnw2pA',
	authDomain: 'messanger-b9756.firebaseapp.com',
	projectId: 'messanger-b9756',
	storageBucket: 'messanger-b9756.appspot.com',
	messagingSenderId: '330822389013',
	appId: '1:330822389013:web:6c8a4311db69abd6186d1c',
	measurementId: 'G-WD8JWLLJ94',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
