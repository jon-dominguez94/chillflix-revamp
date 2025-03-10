import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as listActions from '../../store/list';


const Preview = ({ sessionUser, movie, onList, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ toggleList, setToggleList ] = useState(onList)

    function handleList() {
        if (toggleList) {
            setToggleList(false);
            dispatch(listActions.removeFromListThunk(sessionUser.id, movie.id));
        } else {
            setToggleList(true);
            dispatch(listActions.addToListThunk(sessionUser.id, movie.id));
        }
    }

    return (
        <>
            <div className="preview-container">
                <div className="video-wrapper">
                    <video
                        className=""
                        width="100%"
                        height="auto"
                        playsInline
                        src={movie.video}
                        autoPlay
                    >
                        Your browser does not support the video tag.
                    </video>

                    <Link to={`/watch/${movie.id}`}>
                        <div className="play-area"></div>
                    </Link>

                    <div className="center-flex tn-links">
                        <Link to={`/watch/${movie.id}`}>
                            <div className="play-btn">
                                <div className="main-video-link">
                                    <button className="button play" />
                                    <span>Play</span>
                                </div>
                            </div>
                        </Link>
                        <p className="center-flex round-button plus-btn" onClick={handleList}>
                            {onList ? <i className="fa fa-check" /> : <i className="fa fa-plus"></i>}
                        </p>
                    </div>

                    <p className="center-flex round-button close-btn" onClick={onClose}>
                        <i className="fa fa-x"></i>
                    </p>
                </div>
                <div className="bottom-info">
                    <div className="movie-info">
                        <p className="preview-title">
                            {movie.title}
                        </p>
                        <p className="preview-description">
                            {movie.description}
                        </p>
                    </div>
                    <div className="fake-info">
                        <div className="fake-section">
                            <p className=""><span className="grey">Cast: </span>Stephen Curry, Draymond Green, Klay Thompson, and <span className='italic'>more</span></p>
                        </div>
                        <div className='fake-section'>
                            <p className=""><span className="grey">Genres: </span>Political TV Shows, TV Shows Based on Books, TV Mysteries</p>
                        </div>
                        <div className='fake-section'>
                            <p className=""><span className="grey">This show is: </span>Exciting, Suspenseful</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Preview;
