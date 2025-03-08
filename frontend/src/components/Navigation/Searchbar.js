import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Searchbar = ({ isLoaded }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef();

    const [queryString, setQueryString] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // - once content is loaded, check for search page and restore search state
    // - needed if user manually types in url or refreshes during a search
    useEffect(() => {
        if (isLoaded && location.pathname === "/search") {
            console.log('restoring queryString');

            setQueryString(
                decodeURIComponent(location.search)
                .split('?=')[1].toLowerCase()
            );

            focusSearch();
        }
    }, [isLoaded]);

    // if dropdown is opened, create a click listener on entire page to close it
    useEffect(() => {
        if (showSearch === false) return;

        const closeMenu = () => {
            setQueryString('');
            setShowSearch(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showSearch]);

    // puts the cursor on the search bar
    function focusSearch() {
        inputRef.current.focus();

        if (showSearch === true) return;
        setShowSearch(true);
    }

    // updates the url query and the search bar
    function openSearch(e) {
        e.stopPropagation();
        navigate(`/search?=${queryString}`);
        focusSearch();
    };

    function updatePath(e) {
        navigate(`/search?=${e.target.value}`);
        setQueryString(e.target.value);
    }

    return (
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
    )
}

export default Searchbar
