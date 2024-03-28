import 'firebase/compat/firestore';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import firebaseApp from './config';

// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(firebaseApp);
const db = initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
export default db;

// https://stackoverflow.com/questions/71045643/could-not-reach-cloud-firestore-backend-react-native-firebase-v9