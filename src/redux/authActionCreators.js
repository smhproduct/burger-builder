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
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
}

//TEST ACCOUNT(Signed up)
//m@g.co   
//987654