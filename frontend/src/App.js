import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import SplashPage from "./components/session/SplashPage";
import LoginForm from "./components/session/LoginFormModal/LoginForm";
import SearchPage from "./components/Search";

// remove
import TempPage from "./components/Temp";
//

import Browse from "./components/Browse";
import Watch from "./components/Movies/Watch";
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
      {isLoaded && (
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<LoginForm signup={true} />} />

          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/recentlyadded" element={<TempPage name="rcently added" />} />
          <Route path="/comingsoon" element={<TempPage name="coming soon" />} />
          <Route path="/list" element={<TempPage name="my list" />} />


          <Route path="/watch/:watchId" element={<Watch />} />
          <Route path="*" element={<MyRedirect />} />
        </Routes>
      )}
      <div className="logged-header">
        <Navigation isLoaded={isLoaded} />
      </div>
    </>
  );
}

export default App;
