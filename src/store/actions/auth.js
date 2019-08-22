import axios from '../../axiosUrl';
import * as actionTypes from './actionTypes';

export const setUserData = (user) => {
    return {
        type: actionTypes.SET_USER_DATA,
        user: user
    }
}

export const setErrors = (errors) => {
    return {
        type: actionTypes.SET_AUTH_ERRORS,
        errors: errors
    }
}

export const setAuthredirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setToken = (token) => {
    return {
        type: actionTypes.SET_TOKEN,
        token: token
    }
}

export const Login = (email, password) => {
    return dispatch => {
        const param = {"email": email, "password": password};
        return axios.post('api/v1/login', param, {headers: {'Content-Type': 'application/json'}}).then(res => {
            console.log(res.data);
            dispatch(setUserData(res.data));
            dispatch(setToken(res.data.token));
            dispatch(setErrors({}));
            localStorage.setItem('token', res.data.token);
            dispatch(setAuthredirectPath('/dashboard'));
            return res.data;
        }).catch(err => {
            console.log(err.response.data);
            dispatch(setErrors(err.response.data));
            return {};
        });
    }
}

export const Register = (firstName,lastName,email, password) => {
    return dispatch => {
        const param = {"first_name":firstName, "last_name": lastName, "email": email, "password": password};
        return axios.post('api/v1/register', param, {headers: {'Content-Type': 'application/json'}}).then(res => {
            console.log(res.data);
            dispatch(setUserData(res.data));
            dispatch(setErrors({}));
            dispatch(setAuthredirectPath('/dashboard'));
            return res.data;
        }).catch(err => {
            console.log(err.response.data);
            dispatch(setErrors(err.response.data));
            return {};
        });
    }
}

