// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*===Must open Authentication in firebase console===*/

// Firebase config
const firebaseConfig = {
	apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default firebaseApp;
