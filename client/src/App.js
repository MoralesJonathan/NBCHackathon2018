import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import BillPage from './Pages/BillPage';
import ActionPage from './Pages/ActionPage';
import Profile from './Pages/Profile';
import API from './utils/userAPI';
import labelsService from './utils/labelsService';
import LandingPage from './Pages/LandingPage';

class App extends Component {
  constructor(props) {
    super(props)
    const language = localStorage.getItem("language") || 'english';
    const address = localStorage.getItem("address") || '33183';
    this.state = {
      isLoggedIn: localStorage.getItem("jwtToken"),
      redirectToProfile: false,
      redirect: false,
      email: "",
      password: "",
      name: "",
      errMsg: "",
      profile: {
        language,
        address
      },
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.onUserAuth = this.onUserAuth.bind(this);
    this.onUserProfile = this.onUserProfile.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
    this.translate = this.translate.bind(this);
    labelsService.setLanguage(language);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errMsg: '',
    });
  };

  translate(labelName) {
    return labelsService.translate(labelName);
  }

  onUserAuth(res) {
    if (res && res.request.status === 200 || res.request.status === 201) {
      localStorage.setItem('jwtToken', res.data.token);
      API.setAuthToken(res.data.token);
      API.getProfile().then(this.onUserProfile).catch(e => {
        console.log('error on user Login');
        this.setState({ redirectToProfile: true });
      });
    } else if (res.request.status === 401) {
      console.log("BAD");
    }
  }
  
  onUserProfile(res) {
    console.log('res ', res);
    if (res && res.data && res.request && (res.request.status === 200 || res.request.status === 201)) {
      this.setState({ redirect: true, profile: res.data });
      window.location.reload();
    }
    else {
      this.setState({ redirectToProfile: true })
    }
  }

  handleLogin = (evt) => {
    evt && evt.preventDefault && evt.preventDefault();
    if (this.state.email && this.state.password) {
      API.login({
        email: this.state.email,
        password: this.state.password,
      }).then(this.onUserAuth).catch(err => {
        console.log(err);
        if (err && err.response && err.response.data && err.response.data.user) {
          this.setState({errMsg: err.response.data.user})
        }
        if (err && err.response && err.response.data && err.response.data.password) {
          this.setState({errMsg: err.response.data.password})
        }
      });
    }
    else{
      this.setState({errMsg: "Missing email or password"});
    }
  }

  handleRegister = (evt) => {
    evt.preventDefault();
    if (this.state.name && this.state.email && this.state.password) {
      API.register({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
      }).then(this.handleLogin).catch(err => {
        console.log(err);
        if (err && err.response && err.response.data && err.response.data.password) {
          this.setState({errMsg: err.response.data.password})
        }
        if (err && err.response && err.response.data && err.response.data.email) {
          this.setState({errMsg: err.response.data.email})
        }
      });
    }
    else {
      this.setState({errMsg: 'Missing required information'})
    }
  }

  switchLanguage(newLanguage) {
    labelsService.setLanguage(newLanguage);
  }

  handleProfile = (profileInfo) => {
    console.log('profileInfo: ', profileInfo);
    if (profileInfo.address && profileInfo.language) {
      localStorage.setItem('address',profileInfo.address);
      localStorage.setItem('language',profileInfo.language);
      API.setProfile(profileInfo).then(res => {
        this.setState({profile: profileInfo, isLoggedIn: true, redirect: true, redirectToProfile: false});
      }).catch(err => console.log(err));
    }
    else{
      alert("Address and language are required fields");
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    }, () => {
    })
  };

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/createProfile" render={(props) => (<Profile {...props} switchLanguage={this.switchLanguage} translate={this.translate} handleProfile={this.handleProfile} handleInputChange={() => this.handleInputChange} />)} />
          <Route exact path="/register" render={(props) => (<Register {...props} errMsg={this.state.errMsg} translate={this.translate} handleRegister={this.handleRegister} handleInputChange={() => this.handleInputChange} />)} />
          <Route exact path="/bill/:id" render={(props) => (<BillPage translate={this.translate} {...props} />)} />
          <Route exact path="/takeaction/:id" render={(props) => (<ActionPage {...props} />)} />
          <Route exact path="/home" render={(props) => (<LandingPage {...props} userInfo= {this.state.profile} translate={this.translate} />)} />
          <Route exact path="/" render={(props) => (<Login {...props} errMsg={this.state.errMsg} translate={this.translate} handleLogin={this.handleLogin} handleInputChange={() => this.handleInputChange} />)} />
          <Switch>
            {this.state.redirectToProfile && <Redirect to='/createProfile'/>}
            {(this.state.isLoggedIn && this.state.redirect) && <Redirect to="/home" />}
            {!this.state.isLoggedIn && <Redirect to="/" />}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;