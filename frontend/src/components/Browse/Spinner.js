import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SpinnerItem from "./SpinnerItem"


const Spinner = ({ category, movies, order }) => {
    const listMovies = useSelector(state => state.list);
    const [ spinnerMovies, setSpinnerMovies ] = useState(movies);

    useEffect(() => {
        if (order === "1")
            setSpinnerMovies(Object.values(listMovies));
    }, [listMovies]);

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
        <>
            {spinnerMovies.length > 0 && (
                <div className="spinner">
                    <h1 className="category-header">{category}</h1>
                    <div className="center-flex tn-scale">

                        { spinnerMovies.map(movie => { return (
                            <div key={`${order}-${movie.id}`} className="spinner-item-wrapper">
                                <SpinnerItem movie={movie} order={order} />
                            </div>
                        )})}


                        <div className={`center-flex invisible right scroll`} onClick={() => scroll('left')}>
                            <i className="fa fa-angle-right scroll-btn"></i>
                        </div>
                        <div className={`center-flex invisible left scroll`} onClick={() => scroll('right')}>
                            <i className="fa fa-angle-left scroll-btn"></i>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Spinner;
