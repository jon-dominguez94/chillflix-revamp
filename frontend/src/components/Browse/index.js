import { useSelector } from "react-redux";

import MyRedirect from "../MyRedirect";
import Movies from "../Movies";

const Browse = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return (<MyRedirect />);

    return (
        <div className="browse-container">
            <Movies />
        </div>
    )
}

export default Browse;
