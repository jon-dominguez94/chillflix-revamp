import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SpinnerItem from "../Browse/SpinnerItem";

// import * as movieActions from '../../store/movies';
// import * as listActions from '../../store/list';

// import './Search.css';

const DisplayPage = ({movies, name}) => {
    const listMovies = useSelector(state => state.list);
    const [displayMovies, setDisplayMovies] = useState(movies || []);

    // useEffect(() => {
    //     setDisplayMovies(movies || []);
    // }, [movies]);

    useEffect(() => {
        setDisplayMovies(
            name === "list" ?
                Object.values(listMovies).sort(sortByDate)
            :
                movies || []

        )
    }, [movies, listMovies]);

    function sortByDate(a, b) {
        const d1 = new Date(a.ListMovie.createdAt);
        const d2 = new Date(b.ListMovie.createdAt);
        return d1 - d2;
    }

    return (
        <div className="display-page-container">
            <div className="search-page-container">
                {displayMovies.map(movie => (
                    <div key={`display-${movie.id}`} className="filter-container">
                        <SpinnerItem movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default DisplayPage;
