import React from 'react';
import { useSelector } from 'react-redux';
// import { connect } from 'react-redux';
// import { Route, Redirect, withRouter } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';

export const AuthRoute = ({ path, element: Element }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <Route path={path} render={(props) => (
            !sessionUser ? (
                <Element {...props} />
            ) : (
                <Navigate to="/browse" />
            )
        )} />
    )
}

// const Auth = ({ path, element: Element }) => {
//     return (
//     const sessionUser = useSelector(state => state.session.user);

//     <Route path={path} render={(props) => (
//         !loggedIn ? (
//             <Element {...props} />
//         ) : (
//             <Redirect to="/browse" />
//         )
//     )} />
// )
// };



// const Protected = ({ component: Component, path, loggedIn, exact }) => (
//     <Route path={path} exact={exact} render={(props) => (
//         loggedIn ? (
//             <Component {...props} />
//         ) : (
//             <Redirect to="/login" />
//         )
//     )} />
// );


// const mstp = state => {
//     return { loggedIn: Boolean(state.session.id) };
// };

// export const AuthRoute = withRouter(connect(mstp, null)(Auth));
// export const ProtectedRoute = withRouter(connect(mstp, null)(Protected));
