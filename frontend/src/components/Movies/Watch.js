import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as moviesActions from '../../store/movies'

import MyRedirect from "../MyRedirect";

const Watch = () => {
    const dispatch = useDispatch();
    const { watchId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const movie = useSelector(state => state.movies[watchId]);

    const [isMoviesLoaded, setIsMoviesLoaded ] = useState(false);

    useEffect(() => {
        dispatch(moviesActions.receiveMoviesThunk())
            .then(() => setIsMoviesLoaded(true));
    }, [dispatch]);

    function setControls() {
        const video = document.getElementById("current-video");
        if (video) {
            if (window.matchMedia("(pointer: coarse)").matches) {
                video.removeAttribute('controls');
            } else {
                video.setAttribute('controls', true);
            }
        }
    }


    if (!sessionUser) return (<MyRedirect />);

    if (!movie) return (
        <div className="center-flex not-found">
            <p>Sorry, nothing to see here</p>
            <Link className="nav-link-item" to="/">
                <div className="back-btn-container">
                    <button className="center-flex back-btn" >
                        <i className="fa fa-arrow-left"></i>
                        <span className="back-text">Back to Browse</span>
                    </button>
                </div>
            </Link>
        </div>
    );

    return (
        <>
            {isMoviesLoaded && (<div className="center-flex curr-movie-wrapper">
                <div id="video-container" onMouseOver={setControls}>
                    <video
                        id="current-video"
                        className="current-video"
                        width="100%"
                        height="auto"
                        src={movie.video}
                        autoPlay
                    >
                        Your browser does not support the video tag.
                    </video>

                    <Link className="nav-link-item" to="/">
                        <div className="back-btn-container">
                            <button className="center-flex back-btn" >
                                <i className="fa fa-arrow-left"></i>
                                <span className="back-text">Back to Browse</span>
                            </button>
                        </div>
                    </Link>

                </div>
            </div>)}
        </>
    );
}

export default Watch;
