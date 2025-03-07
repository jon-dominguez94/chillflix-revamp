import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import MyRedirect from "../MyRedirect";
import MainVideo from "../Movies/MainVideo";
import AllMovies from "../Movies/AllMovies";
import Footer from "./Footer";

import TempPage from "../Temp";

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
        <Routes>
            <Route path="/" element={
                <>
                    {isMoviesLoaded && isListLoaded && (
                        <div className="browse-container">
                            <MainVideo />
                            <AllMovies />
                            <Footer />
                        </div>
                    )}
                </>
            } />
            <Route path="/recentlyadded" element={<TempPage name="rcently added" />} />
            <Route path="/comingsoon" element={<TempPage name="coming soon" />} />
            <Route path="/list" element={<TempPage name="my list" />} />
            <Route path="*" element={<MyRedirect />} />
        </Routes>
    )
}

export default Browse;
