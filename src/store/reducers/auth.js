import * as actionType from '../actions/actionTypes';

const initialState={
    userInfo: {},
    errors: {},
    authRedirectPath: '/',
    token: null,
}

const setUserData = (state, action) => {
    return {
        ...state,
        userInfo: action.user,
    }
}

const setErrors = (state, action) => {
    return {
        ...state,
        errors: action.errors,
    }
}

const setAuthredirectPath = (state, action) => {
    return {
        ...state,
        authRedirectPath: action.path,
    }
}

const authLogout = (state, action) => {
    return {
        ...state,
        userInfo: {},
        token: null
    }
}

const setToken = (state, action) => {
    return {
        ...state,
        token: action.token,
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionType.SET_USER_DATA:
            return setUserData(state, action);
        case actionType.SET_AUTH_ERRORS:
            return setErrors(state, action);
        case actionType.SET_AUTH_REDIRECT_PATH:
            return setAuthredirectPath(state, action);
        case actionType.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionType.SET_TOKEN:
            return setToken(state, action);
        default:
            return state
    }
}

export default reducer;