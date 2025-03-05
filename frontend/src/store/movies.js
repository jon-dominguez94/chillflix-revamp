import { csrfFetch } from './csrf';

const RECEIVE_ONE_MOVIE = "session/RECEIVE_ONE_MOVIE";
const RECEIVE_ALL_MOVIES = "session/RECEIVE_ALL_MOVIES";

export const receiveMoviesThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/movies');

    const data = await response.json();
    dispatch(receiveMoviesAction(data.movies));
    return response;
}

const receiveMoviesAction = (movies) => {
    return {
        type: RECEIVE_ALL_MOVIES,
        payload: movies
    };
};

export const receiveMovieThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/movies/${id}`);

    const data = await response.json();
    dispatch(receiveMovieAction(data.movie));
    return response;
}

const receiveMovieAction = (movie) => {
    return {
        type: RECEIVE_ONE_MOVIE,
        payload: movie
    };
};

const initialState = {};

const moviesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case RECEIVE_ALL_MOVIES:
            newState = Object.assign({}, state);

            for (let movie of action.payload) {
                newState[movie.id] = movie;
                if (movie.title === "Game of Thrones") {
                    newState["main"] = movie;
                }
            }

            return newState;
        case RECEIVE_ONE_MOVIE:
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}

export default moviesReducer;
