import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from '../../store/session';

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState(false);

    const openMenu = (e) => {
        e.stopPropagation();
        if (showMenu === true) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (showMenu === false) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('mouseover', closeMenu);

        return () => document.removeEventListener("mouseover", closeMenu);
        // document.addEventListener('click', closeMenu);

        // return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutThunk());
    };

    return (
        // <div className="profile-dropdown" onClick={openMenu}>
        <div className="profile-dropdown" onMouseOver={openMenu}>
            <img className="profile-logo" src="https://assets.nflxext.com/ffe/profiles/avatars_v2/32x32/PICON_025.png" alt="" />
            <i className={`fa fa-caret-down ${showMenu && 'rotated'}`}></i>
            {showMenu && (
                <>
                    <i className="fa fa-caret-up dropdown-caret"></i>
                    <ul id="my-dropdown" className="dropdown-content">
                        <li className="drop-item manage-link" >Hello, {user.username}!</li>
                        <li className="drop-item" onClick={logout}>Sign out of Chillflix</li>
                    </ul>
                </>
            )}
            <div className="nav-control-wrapper" onMouseOver={openMenu} />
        </div>
    )
}

export default ProfileButton
