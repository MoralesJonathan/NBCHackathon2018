import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import API from './utils/API';
import LandingPage from './Pages/LandingPage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.getItem("jwtToken"),
      redirect: false,
      email: "",
      password: "",
      name: "",
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.login({
        email: this.state.email,
        password: this.state.password,
      }).then(data => { //based on response here either redirect or stay in loggin

        if (data.request.status === 200) {
          localStorage.setItem('jwtToken', data.data.token);
          this.setState({ redirect: true })
          window.location.reload();
        } else if (data.request.status === 401) {
          console.log("BAD")
        }
      })
        .catch(err => console.log(err));
    }
    else{
      
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.password) {
      API.register({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
      }).then(data => { //based on response here either redirect or stay in loggin

        if (data.request.status === 200) {
          localStorage.setItem('jwtToken', data.data.token);
          this.setState({ redirect: true })
          window.location.reload();
        } else if (data.request.status === 401) {
          console.log("BAD")
        }
      })
        .catch(err => console.log(err));
    }
    else{
      
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
          <Route exact path="/register" render={(props) => (<Register {...props} handleRegister={() => this.handleRegister} handleInputChange={() => this.handleInputChange} />)} />
          <Switch>
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