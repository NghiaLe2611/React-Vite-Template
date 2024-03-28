import {GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import firebaseApp from './config';

const auth = getAuth(firebaseApp);
export const expireTime = 60; // 60m
const provider = new GoogleAuthProvider();

// Enable Authenticate sign-in provider email/password in console Firebase
const login = async (email, password) => {
	let result = null,
		error = null;
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		if (res.user) {
			const {accessToken} = res.user;
			Cookies.set('token', accessToken);
			window.location.href = '/';
		}
	} catch (e) {
		error = e;
	}

	return {result, error};
};

const logOut = async (navigate) => {
	try {
		// console.log('log out');
		await signOut(auth);
		Cookies.remove('token');
		localStorage.removeItem('exp');
		// Handle any additional cleanup or redirection
		// if (navigate) {
		//     window.location.reload();
		// }
		window.location.reload();
	} catch (e) {
		console.e('Logout error:', e);
	}
};

const loginWithGmail = async (callback) => {
	try {
		const res = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(res);
        // console.log(123, res);
		// console.log(456, credential);
		// const token = credential.accessToken;
        if (callback) callback();
	} catch (err) {
		console.log(err);
	}
};

const setAppCookie = (name, token, mins = expireTime) => {
	// default in mins
	const expirationDate = new Date();
	const expTime = expirationDate.getTime() + mins * 60 * 1000;
	expirationDate.setTime(expTime);
	Cookies.set(name, token, {expires: expirationDate});
};

const getCookieExpirationTime = (cookieName) => {
	const cookieValue = Cookies.get(cookieName);
	if (!cookieValue) return null;
	const decodedToken = jwt.decode(cookieValue);

	if (!decodedToken) return null;
	return decodedToken.exp * 1000;
};

const getUserInfoFromToken = (token) => {
	if (!token) return null;
	const decodedToken = jwt.decode(token);
    if (!decodedToken) return null;

    return {
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture
    };
};

export {logOut, login, loginWithGmail, setAppCookie, getCookieExpirationTime, getUserInfoFromToken};
