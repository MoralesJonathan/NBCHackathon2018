import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import API from './utils/userAPI';
import LandingPage from './Pages/LandingPage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.getItem("jwtToken"),
      redirectToProfile: false,
      redirect: false,
      email: "",
      password: "",
      name: "",
      profile: {},
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onUserAuth(res) {
    if (res.request.status === 200) {
      localStorage.setItem('jwtToken', res.data.token);
      API.setAuthToken(res.data.token);
      API.getProfile().then(this.onUserProfile)
    } else if (res.request.status === 401) {
      console.log("BAD");
    }
  }

  onUserProfile(res) {
    if (res.request.status === 200) {
      this.setState({ redirect: true, profile: res.data.profile });
      window.location.reload();
    }
    else {
      this.setState({ redirectToProfile: true })
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.login({
        email: this.state.email,
        password: this.state.password,
      }).then(this.onUserAuth).catch(err => console.log(err) && alert("Server Error on Login"));
    }
    else{
      alert("Invalid form information")
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.password) {
      API.register({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
      }).then(this.onUserAuth).catch(err => console.log(err) && alert("Server Error on Sign Up"));
    }
    else{
      alert("Invalid form information")
    }
  }

  handleProfile = (profileInfo) => {
    if (profileInfo.address && profileInfo.zipCode && profileInfo.interests) {
      API.setProfile(profileInfo).then(res => {

      }).catch(err => console.log(err) && alert("Server Error on Sign Up"));
    }
    else{
      alert("Invalid form information")
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
          <Route exact path="/createProfile" render={(props) => (<Profile {...props} handleProfile={() => this.handleProfile} handleInputChange={() => this.handleInputChange} />)} />
          <Route exact path="/register" render={(props) => (<Register {...props} handleRegister={() => this.handleRegister} handleInputChange={() => this.handleInputChange} />)} />
          <Switch>
            {this.state.redirectToProfile && <Redirect to='/createProfile'/>}
            {!this.state.isLoggedIn ? <div><Route exact path="/" render={(props) => (<Login {...props} handleLogin={() => this.handleLogin} handleInputChange={() => this.handleInputChange} />)} />
              <Redirect from="/" to="/" /></div> :
              <div>
                <Route exact path="/" component={LandingPage} />
                {/* <Redirect from="/" to="/dashboard" /> */}
              </div>}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;