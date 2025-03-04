import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef();
    const sessionUser = useSelector(state => state.session.user);

    const [queryString, setQueryString] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // - once content is loaded, check for search page and restore search state
    // - needed if user manually types in url or refreshes during a search
    useEffect(() => {
        console.log(location.pathname);
        if (isLoaded) {
            console.log('isLoaded');
            if (location.pathname === "/search") {
                console.log('restoring queryString');
                setQueryString(location.search.split('?=')[1]);
                focusSearch();
            }
        } else {
            console.log("not loaded");
        }
    }, [isLoaded]);

    // if dropdown is opened, create a click listener on entire page to close it
    useEffect(() => {
        if (showSearch === false) return;

        console.log('creating close menu');

        const closeMenu = () => {
            setQueryString('');
            setShowSearch(false);
            navigate('/browse');
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showSearch]);

    // useEffect(() => {
    //     console.log('changing queryString');
    //     navigate(`/search?=${queryString}`);
    // }, [queryString]);

    // puts the cursor on the search bar
    function focusSearch() {
        inputRef.current.focus();

        if (showSearch === true) return;
        setShowSearch(true);
    }

    // updates the url query and the search bar
    function openSearch(e) {
        e.stopPropagation();

        navigate(`/search?=`);
        // navigate(`/search?=${queryString}`);
        focusSearch();
    };

    function updatePath(e) {
        navigate(`/search?=${e.target.value}`);
        setQueryString(e.target.value);
    }


    if (!sessionUser || location.pathname.includes('/watch'))
        return <></>
    else {
        return (
            <>
                {isLoaded && (
                    <div className="navigation-wrapper">
                        <div className="center-flex main-header head-logged">
                            <div>
                                <Link to="/">
                                    <img className="main-logo" src="https://fontmeme.com/permalink/181212/c5c4b3134061f86d06de9895b1ea5522.png" border="0" />
                                </Link>
                            </div>
                            <div className="center-flex nav-items">
                                <div className="center-flex nav-links regular">
                                    <NavLink className="nav-link-item noh" to="/browse">Home</NavLink>
                                    {/* <a className="nav-link-item noh" href="#RecentlyAdded">Recently Added</a> */}
                                    {/* <a className="nav-link-item noh" href="#ComingSoon">Coming Soon</a> */}
                                    <NavLink className="nav-link-item noh" to="/recentlyadded">Recently Added</NavLink>
                                    <NavLink className="nav-link-item noh" to="/comingsoon">Coming Soon</NavLink>
                                    <NavLink className="nav-link-item noh" to="/list">My List</NavLink>
                                </div>

                                <div className="center-flex hamburger">
                                    <span>Browse</span>
                                    <i className="fa fa-caret-down"></i>

                                    <div id="ham-space"></div>
                                    <div className="center-flex ham-nav-links in-hamburger">
                                        <i className="fa fa-caret-up"></i>
                                        <NavLink className="nav-link-item onh" to="/browse">Home</NavLink>
                                        <NavLink className="nav-link-item onh" to="/recentlyadded">Recently Added</NavLink>
                                        <NavLink className="nav-link-item onh" to="/comingsoon">Coming Soon</NavLink>
                                        <NavLink className="nav-link-item onh" to="/list">My List</NavLink>
                                    </div>
                                </div>

                                <div className="center-flex nav-controls">
                                    <div className="center-flex nav-items wsearch">
                                        <div id="search-controls" className={`search-controls ${showSearch && ("white")}`} onClick={openSearch} >
                                            <div className="search-btn" >
                                                <i className="fa fa-search"></i>
                                            </div>
                                            <input
                                                id="search-input"
                                                ref={inputRef}
                                                className={`${showSearch && ("not-displayed")}`}
                                                type="text"
                                                placeholder="Search by title"
                                                value={queryString}
                                                onChange={updatePath}
                                            />
                                        </div>
                                        <ProfileButton user={sessionUser} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Navigation;
