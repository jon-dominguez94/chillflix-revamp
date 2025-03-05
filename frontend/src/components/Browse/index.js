import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MyRedirect from "../MyRedirect";
import Movies from "../Movies";

import * as moviesActions from '../../store/movies';

const Browse = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [isMoviesLoaded, setIsMoviesLoaded ] = useState(false);

     useEffect(() => {
        dispatch(moviesActions.receiveMoviesThunk())
            .then(() => setIsMoviesLoaded(true));
      }, [dispatch]);

    if (!sessionUser) return (<MyRedirect />);

    return (
        <>
            {isMoviesLoaded && (<div className="browse-container">
                <Movies />
            </div>)}
        </>
    )
}

export default Browse;
