import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import SplashPage from "./components/SplashPage";
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginFormPage />} />
      <Route path="/signup" element={<SignupFormPage />} />
    </Routes>
  );
}

export default App;
