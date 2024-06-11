import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpModal from './components/auth/SignUpModal'; // Import SignUpModal instead of SignUpForm
import NavBar from './NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import SpotPage from './components/SpotPage';
import AllPhotosPage from './components/AllPhotosPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/sign-up' exact={true}>
          <SignUpModal />
        </Route>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path='/spots/:spotId/photos' exact={true}>
          <AllPhotosPage />
        </Route>
        <Route path='/spots/:spotId' exact={true}>
          <SpotPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
