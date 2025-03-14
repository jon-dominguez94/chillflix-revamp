import { csrfFetch } from './csrf';

const SET_USER = "session/SET_USER";
const CREATE_USER = "session/CREATE_USER";
const REMOVE_USER = "session/REMOVE_USER";

const loginAction = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const logoutAction = () => {
    return {
        type: REMOVE_USER
    };
};

export const loginThunk = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });

    const data = await response.json();
    dispatch(loginAction(data.user))
    return response;
}

export const restoreUserThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(loginAction(data.user))
    return response;
}

export const signupThunk = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await response.json();
    dispatch(loginAction(data.user));
    return response;
}

export const logoutThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(logoutAction());
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;
