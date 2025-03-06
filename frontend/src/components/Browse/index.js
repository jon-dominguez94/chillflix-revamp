import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MyRedirect from "../MyRedirect";
import MainVideo from "../Movies/MainVideo";
import AllMovies from "../Movies/AllMovies";
import Footer from "./Footer";

import './Browse.css';
import '../Movies/Movies.css';

import * as moviesActions from '../../store/movies';
import * as listActions from '../../store/list';

const Browse = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [isMoviesLoaded, setIsMoviesLoaded ] = useState(false);
    const [isListLoaded, setIsListLoaded ] = useState(false);

     useEffect(() => {
        dispatch(moviesActions.receiveMoviesThunk())
            .then(() => setIsMoviesLoaded(true))
            .then(() => dispatch(listActions.getListThunk(sessionUser.id)))
            .then(() => setIsListLoaded(true));
      }, [dispatch]);

    if (!sessionUser) return (<MyRedirect />);

    return (
        <>
            {isMoviesLoaded && isListLoaded && (
                <div className="browse-container">
                    <MainVideo />
                    <AllMovies />
                    <Footer />
                </div>
            )}
        </>
    )
}

export default Browse;
