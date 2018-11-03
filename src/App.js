import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './components/AuthComponents/Navigation';
import LandingPage from './components/AuthComponents/Landing';
import SignUpPage from './components/AuthComponents/SignUp';
import SignInPage from './components/AuthComponents/SignIn';
import PasswordForgetPage from './components/AuthComponents/PasswordForget';
import HomePage from './components/AuthComponents/Home';
import AccountPage from './components/AuthComponents/Account';
import withAuthentication from './components/AuthComponents/Session/withAuthentication';
import * as routes from './constants/routes';

import './App.css';

const App = () =>
  <Router>
    <div className="app">
      <Navigation />

      <hr/>

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />

      <hr/>

      <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span>
    </div>
  </Router>

export default withAuthentication(App);