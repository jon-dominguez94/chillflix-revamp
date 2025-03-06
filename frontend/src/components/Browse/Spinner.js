import { useState, useEffect } from "react";

import SpinnerItem from "./SpinnerItem"


const Spinner = ({ category, movies, order }) => {
    const [ spinnerMovies, setSpinnerMovies ] = useState(movies);

    function scroll(direction) {
        let newMovies = [...spinnerMovies];
        if (direction === "left") {
            newMovies.push(newMovies.shift());
            newMovies.push(newMovies.shift());
        } else {
            newMovies.unshift(newMovies.pop());
            newMovies.unshift(newMovies.pop());
        }
        setSpinnerMovies(newMovies);
    }

    return (
        <div className="spinner">
            <h1 className="category-header">{category}</h1>
            <div className="center-flex tn-scale">

                { spinnerMovies.map(movie => { return (
                    <div key={`${order}-${movie.id}`} className="spinner-item-wrapper">
                        <SpinnerItem movie={movie} order={order} />
                    </div>
                )})}


                {/* <div className={`right scroll scroll-${order}`} onClick={() => scroll('left')}> */}
                <div className={`center-flex invisible right scroll`} onClick={() => scroll('left')}>
                    <i className="fa fa-angle-right scroll-btn"></i>
                </div>
                {/* <div className={`left scroll scroll-${order}`} onClick={() => scroll('right')}> */}
                <div className={`center-flex invisible left scroll`} onClick={() => scroll('right')}>
                    <i className="fa fa-angle-left scroll-btn"></i>
                </div>
            </div>
        </div>
    )
}

export default Spinner;
