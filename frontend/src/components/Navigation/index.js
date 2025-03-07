import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, NavLink } from "react-router-dom";

import Searchbar from "./Searchbar";
import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const [scrolled, setScrolled] = useState(location.pathname.includes('/browse'));

    // add scroll event listener after first render
    useEffect(() => {
        const handleScroll = () => {
            window.scrollY <= 20 ? setScrolled(true) : setScrolled(false)
        }

        window.addEventListener('scroll', handleScroll);

        // cleanup listener
        return () => { window.removeEventListener('scroll', handleScroll)};
    }, []);

    // only use scroll effect on browse page
    useEffect(() => {
        setScrolled(location.pathname.includes('/browse'));
    }, [location]);

    if (!sessionUser || location.pathname.includes('/watch'))
        return <></>
    else {
        return (
            <>
                {isLoaded && (
                    <div className={`navigation-wrapper ${scrolled && 'gradient-bg'}`}>
                        <div className="center-flex main-header">
                            <div>
                                <Link to="/">
                                    <img className="main-logo" src="https://fontmeme.com/permalink/181212/c5c4b3134061f86d06de9895b1ea5522.png" border="0" />
                                </Link>
                            </div>
                            <div className="center-flex nav-items">
                                <div className="center-flex nav-links regular">
                                    <NavLink className="nav-link-item noh" to="/browse">Home</NavLink>
                                    <NavLink className="nav-link-item noh" to="/browse/recentlyadded">Recently Added</NavLink>
                                    <NavLink className="nav-link-item noh" to="/browse/comingsoon">Coming Soon</NavLink>
                                    <NavLink className="nav-link-item noh" to="/browse/list">My List</NavLink>
                                </div>

                                <div className="center-flex hamburger">
                                    <span>Browse</span>
                                    <i className="fa fa-caret-down"></i>

                                    <div id="ham-space"></div>
                                    <div className="center-flex ham-nav-links in-hamburger">
                                        <i className="fa fa-caret-up"></i>
                                        <NavLink className="nav-link-item onh" to="/browse">Home</NavLink>
                                        <NavLink className="nav-link-item onh" to="/browse/recentlyadded">Recently Added</NavLink>
                                        <NavLink className="nav-link-item onh" to="/browse/comingsoon">Coming Soon</NavLink>
                                        <NavLink className="nav-link-item onh" to="/browse/list">My List</NavLink>
                                    </div>
                                </div>

                                <div className="center-flex nav-controls">
                                    <div className="center-flex nav-items wsearch">
                                        <Searchbar isLoaded={isLoaded} />
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
