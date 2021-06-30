import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import Reviews from './components/Reviews';
import Profile from './authentication/Profile';
import Login from './authentication/Login'
import SignUp from './authentication/SignUp';
import Content from './Content';
import fontawesome from './fonts/fontawesome'
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import MangaProfile from './components/MangaProfile';
import UpdateProfile from './authentication/UpdateProfile';
import Remember from './components/Remember';
import PrivateRoute from './authentication/PrivateRoute';
import ForgotPassword from './authentication/ForgotPassword'


export default function App() {

  return (
    <div className='container'>
      <Router forceRefresh={true}>
        <AuthenticationProvider>

          <Navigation />

          <Switch>


            <Route exact path='/remember' component={Remember} />
            <Route exact path='/' component={Content} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            {/* <Route exact path='/reviews' component={Reviews} /> */}
            <Route exact path='/reviews/:title' component={Reviews} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/manga-profile/:title' component={MangaProfile} />

            {/* Private Routes */}
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/update-profile' component={UpdateProfile} />



            {/* ERROR */}
            <Route path='/' component={() => <div> 404 ERROR </div>} />

          </Switch>
        </AuthenticationProvider>
      </Router>

    </div>

  )

}