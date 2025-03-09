import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SpinnerItem from "../Browse/SpinnerItem";

import * as movieActions from '../../store/movies';
import * as listActions from '../../store/list';

import './Search.css';

const SearchPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);
    const movies = useSelector(state => state.movies);

    const [isMoviesLoaded, setIsMoviesLoaded] = useState(false);
    const [isListLoaded, setIsListLoaded] = useState(false);
    const [filteredMovies, setFilteredMovies ] = useState([]);

    // clear out url params
    useEffect(() => {
        navigate(`${location.pathname}${location.search}`);
    }, [])

    useEffect(() => {
        dispatch(movieActions.receiveMoviesThunk())
            .then(() => setIsMoviesLoaded(true))
            .then(() => dispatch(listActions.getListThunk(sessionUser.id)))
            .then(() => setIsListLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        const queryString = decodeURIComponent(location.search)
                            .split('?=')[1].toLowerCase();

        setFilteredMovies(
            !queryString ?
                []
            :
                Object.values(movies).filter(movie => movie.title.toLowerCase().includes(queryString))
        );
    }, [isListLoaded, location]);

    return (
        <>
            {isMoviesLoaded && isListLoaded && (
                <div className="search-page-container">
                    { filteredMovies.map(movie => (
                        <div key={`filter-${movie.id}`} className="filter-container">
                            <SpinnerItem movie={movie} />
                        </div>
                    ))}
                 </div>
            )}
        </>
    )
};

export default SearchPage;
