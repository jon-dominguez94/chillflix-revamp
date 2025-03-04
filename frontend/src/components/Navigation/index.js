import { useSelector } from "react-redux";
import { useLocation, Link, NavLink } from "react-router-dom";

import Searchbar from "./Searchbar";
import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

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
