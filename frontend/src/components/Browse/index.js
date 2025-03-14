import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import MyRedirect from "../MyRedirect";
import MainVideo from "../Movies/MainVideo";
import AllMovies from "../Movies/AllMovies";
import Footer from "./Footer";
import DisplayPage from "./DisplayPage";

import './Browse.css';
import '../Movies/Movies.css';

import * as moviesActions from '../../store/movies';
import * as listActions from '../../store/list';

const Browse = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const movies = useSelector(state => state.movies);
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
                <>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <div className="browse-container">
                                    <MainVideo movies={movies} />
                                    <AllMovies movies={movies} />
                                </div>
                            </>
                        } />
                        <Route path="/recentlyadded" element={<DisplayPage movies={Object.values(movies)} name="recent" />} />
                        {/* <Route path="/comingsoon" element={<DisplayPage movies={Object.values(movies).slice(8)} name="soon" />} /> */}
                        <Route path="/list" element={<DisplayPage name="list" />} />
                        <Route path="*" element={<MyRedirect />} />
                    </Routes>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Browse;
