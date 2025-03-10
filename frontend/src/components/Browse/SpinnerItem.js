import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../context/Modal';
import Preview from '../Movies/Preview';

import * as listActions from '../../store/list';

const SpinnerItem = ({movie}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const sessionUser = useSelector(state => state.session.user);
    const list = useSelector(state => state.list);

    const [ onList, setOnList ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    useEffect(() => {
        setOnList(movie.id in list);
    }, [list]);

    function handleList() {
        dispatch(
            onList ?
                listActions.removeFromListThunk(sessionUser.id, movie.id)
            :
                listActions.addToListThunk(sessionUser.id, movie.id)
        )
    }

   function expand() {
        const extraString = location.pathname === '/browse' ? `#jbv=${movie.id}` : `${location.search}#jbv=${movie.id}`;
        navigate(`${location.pathname}${extraString}`);
        setShowModal(true);
    }

    function collapse() {
        setShowModal(false);
        const extraString = location.pathname === '/browse' ? '' : location.search;
        navigate(`${location.pathname}${extraString}`);
    }

    return (
        <>
            <div className="spinner-item enlarge">
                <img className="movie-tn" src={movie.thumbnail} />

                <Link to={`/watch/${movie.id}`}>
                    <div className="play-area"></div>
                </Link>

                <div className="invisible tn-links">
                    <div className="center-flex">
                        <Link to={`/watch/${movie.id}`}>
                            <p className="center-flex round-button play-btn">
                                <i className="fa fa-play"></i>
                            </p>
                        </Link>
                        <p className="center-flex round-button plus-btn" onClick={handleList}>
                            {onList ? <i className="fa fa-check" /> : <i className="fa fa-plus"></i>}
                        </p>
                        <p className="center-flex round-button expand-btn" onClick={expand} >
                            <i className="fa fa-angle-down"></i>
                        </p>
                    </div>
                    <p className="tn-title">{movie.title}</p>
                </div>
                {showModal && (
                    <Modal onClose={collapse}>
                        <Preview sessionUser={sessionUser} movie={movie} onList={onList} onClose={collapse} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default SpinnerItem;
