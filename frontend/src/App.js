import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import SplashPage from "./components/session/SplashPage";
import LoginFormPage from './components/session/LoginFormModal';
import SignupFormPage from "./components/session/SignupFormModal";
import Browse from "./components/Browse";
import MyRedirect from "./components/MyRedirect";

import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Routes>
          <Route path="/" element={<SplashPage />} />
          {/* <Route path="/login" element={<LoginFormPage />} /> */}
          {/* <Route path="/signup" element={<SignupFormPage />} /> */}

          <Route path="/browse" element={<Browse />} />
          <Route path="*" element={<MyRedirect />} />
        </Routes>
      )}
    </>
  );
}

export default App;
