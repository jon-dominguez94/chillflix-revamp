import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as listActions from '../../store/list';

const SpinnerItem = ({movie}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const list = useSelector(state => state.list);

    const [onList, setOnList] = useState(false);

    useEffect(() => {
        setOnList(movie.id in list);
    }, [list]);

    function handleList() {
    if (onList) {
        dispatch(listActions.removeFromListThunk(sessionUser.id, movie.id));
    } else {
        dispatch(listActions.addToListThunk(sessionUser.id, movie.id));
    }
}

    return (
        <div className="spinner-item enlarge">
            <img className="movie-tn" src={movie.thumbnail} />

            <Link to={`/watch/${movie.id}`}>
                <div className="play-area"></div>
            </Link>

            {/* <div className={`invisible tn-links`}> */}
            <div className="center-flex invisible tn-links">
                {/* <div className="tn-info"> */}
                    <Link to={`/watch/${movie.id}`}>
                        <p className="center-flex round-button play-btn">
                            <i className="fa fa-play"></i>
                        </p>
                    </Link>
                    {/* <p className="tn-title">{movie.title}</p> */}
                {/* </div> */}

                {/* <div className="list-adder" onClick={handleList}> */}
                    {/* <div className="tn-plus-wrapper"> */}
                        {/* <span>+</span> */}
                    <p className="center-flex round-button plus-btn">
                        {onList ? <i className="fa fa-check" /> : <i className="fa fa-plus"></i>}

                    </p>
                    {/* </div> */}
                {/* </div> */}

                {/* <div className="info-down"> */}
                    {/* <Link to={`/browse/${order}/${movie.id}`}> */}
                <p className="center-flex round-button expand-btn">

                        <i className="fa fa-angle-down"></i>
                </p>
                        {/* <i className="fa fa-angle-down" onClick={this.expand}></i> */}
                    {/* </Link> */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default SpinnerItem;
