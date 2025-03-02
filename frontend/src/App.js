import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import LoginFormPage from './components/LoginFormPage';
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
      <Route path="/login" element={<LoginFormPage />} />
    </Routes>
  );
}

export default App;
