import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MyRedirect from "../MyRedirect";

const Watch = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return (<MyRedirect />);

    return (
        <div className="curr-movie-wrapper">
            <div id="video-container">
                <video
                    className="current-video"
                    width="100vw"
                    height="auto"
                    // src={this.props.movie.url}
                    // src="https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/office.mp4"
                    controls
                    // autoPlay
                >
                    Your browser does not support the video tag.
                </video>

                <Link className="nav-link-item" to="/">
                    <div className="back-btn-container">
                        <button className="back-btn" >
                            <i className="fa fa-arrow-left"></i>
                            <span className="back-text">Back to Browse</span>
                        </button>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default Watch;
