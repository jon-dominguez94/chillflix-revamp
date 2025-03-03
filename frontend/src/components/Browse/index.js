import { useSelector } from "react-redux";

import MyRedirect from "../MyRedirect";

const Browse = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return (<MyRedirect />);

    return (
        <>
            home page
        </>
    )
}

export default Browse;
