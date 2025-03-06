import { csrfFetch } from "./csrf";

const ADD_TO_LIST = "list/ADD_TO_LIST";
const REMOVE_FROM_LIST = "list/REMOVE_FROM_LIST";
const GET_LIST_ITEMS = "list/GET_LIST_ITEMS";

const addToListAction = (movie) => {
    return {
        type: ADD_TO_LIST,
        payload: movie
    }
}

export const addToListThunk = (userId, movieId) => async (dispatch) => {
    const response = await csrfFetch('/api/list', {
        method: 'POST',
        body: JSON.stringify({ userId, movieId })
    });

    const data = await response.json();
    dispatch(addToListAction(data.movie));
    return response;
}

const removeFromListAction = (movieId) => {
    return {
        type: REMOVE_FROM_LIST,
        payload: movieId
    }
}

export const removeFromListThunk = (userId, movieId) => async (dispatch) => {
    const response = await csrfFetch('/api/list', {
        method: 'DELETE',
        body: JSON.stringify({ userId, movieId })
    });

    const data = await response.json();
    dispatch(removeFromListAction(data.movie.id));
    return response;
}

const getListAction = (movies) => {
    return {
        type: GET_LIST_ITEMS,
        payload: movies
    }
}

export const getListThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/list/${userId}`);

    const data = await response.json();
    dispatch(getListAction(data.list.Movies));
    return response;
}

const initialState = {};

const listReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_LIST_ITEMS:
            newState = {};
            for (let movie of action.payload) {
                newState[movie.id] = movie
            }
            return newState;
        case ADD_TO_LIST:
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload;
            return newState;
        case REMOVE_FROM_LIST:
            newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default listReducer
