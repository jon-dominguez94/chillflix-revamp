import { useSelector } from "react-redux";

import Spinner from "../Browse/Spinner";

const AllMovies = () => {
    let movies = {...useSelector(state => state.movies)};

    delete movies['main'];
    movies = Object.values(movies);

    let set1 = [...movies];
    let set2 = shuffle([...movies]);


    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }


    return (
        <div className="spinner-container">
            <Spinner category="My List" order="1" />
            <Spinner category="Recently Added" movies={set1.slice(0, 8)} order="2" />
            <Spinner category="Popular on Chillflix" movies={set1.slice(8)} order="3" />
            <Spinner category="Chill Night" movies={set2.slice(0, 8)} order="4" />
            <Spinner category="Coming Soon" movies={set2.slice(8)} order="5" />
        </div>
    )
}

export default AllMovies;
