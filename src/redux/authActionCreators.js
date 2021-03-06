import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    let authUrl = null;
    if (mode === "Sign Up") authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    else authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    const API_KEY = "AIzaSyBIo11_zZyQCBLn4ibjf834vSQBKrBN3hc";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
}

export const logout = () => {/*
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');*/
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    }
    else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        const currentTime = new Date();
        if (expirationTime <= currentTime) {
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId))
        }
    }
}
//MUST READ:
//Ei je authCheck() function ta banaisi eta kintu website load er shomoi joto early/root e possible okhane set korte hobe
//main root hocche App.js; but okhane ami just Main compo ke call korsi, linear dekhe Main.js keo ami root compo consider korte parbo
//ei function taile Main.js e call hobe

//TEST ACCOUNT(Signed up)
//m@g.co   
//987654