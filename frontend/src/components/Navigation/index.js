import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ProfileButton from "./ProfileButton";

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation();

    if (!sessionUser || location.pathname.includes('/watch'))
        return <></>
    else {
        return (
            <>
                {isLoaded && (
                    <ProfileButton user={sessionUser} />
                )}
            </>
        );
    }
}

export default Navigation;
