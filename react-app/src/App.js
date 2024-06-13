import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpModal from './components/auth/SignUpModal';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import SpotPage from './components/SpotPage';
import AllPhotosPage from './components/AllPhotosPage';
import AirbnbYourHomePage from './components/AirBnbYourHomePage';

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
      <Switch>
        <Route path='/sign-up' exact={true}>
          <SignUpModal />
        </Route>
        <Route path='/' exact={true} >
          <NavBar />
          <HomePage />
        </Route>
        <Route path='/spots/:spotId/photos' exact={true}>
          <NavBar />
          <AllPhotosPage />
        </Route>
        <Route path='/spots/:spotId' exact={true}>
          <NavBar />
          <SpotPage />
        </Route>
        <Route path='/users/spots' exact={true}>
          <AirbnbYourHomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
