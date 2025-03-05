import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MainVideo = () => {
    const sessionUser = useSelector(state => state.session.user);
    const movie = useSelector(state => state.movies.main);

    return (
        <div className="main-thumb">
            <div className="main-gif" />

            <div className="main-video-info">
                <h1 className="original main-video-title">
                    <span>Chillflix</span> Original
                </h1>
                <div className="got-logo">
                    <img src="https://fontmeme.com/permalink/190201/22dd7600a8afe9fbd27d55d434d60f03.png" />
                </div>

                <h2 className="main-video-description">
                    {movie.description}
                </h2>

                <div className="main-video-links">
                    <Link to={`/watch/${movie.id}`}>
                        <div className="play-btn">
                            <div className="main-video-link">
                                <button className="button play" />
                                <span>Play</span>
                            </div>
                        </div>
                    </Link>

                    {/* <div className="list-btn" onClick={this.handleList}> */}
                    <div className="list-btn">
                        <div className="main-video-link">
                            <div className="plus-wrapper">
                                <i className="fa fa-plus"></i>
                                {/* {this.renderButton()} */}
                            </div>
                            <span>My List</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MainVideo;
