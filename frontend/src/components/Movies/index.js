import MainVideo from "./MainVideo";

import './Movies.css'

const Movies = () => {

    return (
        <div className="movies-index">
            <MainVideo />
            {/* <AllMovies list_movies={filtered} movies={this.props.movies} /> */}
        </div>
    )
}

export default Movies;
