import { csrfFetch } from './csrf';

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const login_action = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const logout_action = () => {
    return {
        type: REMOVE_USER
    };
};

export const login_thunk = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });

    const data = await response.json();
    dispatch(login_action(data.user))
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
