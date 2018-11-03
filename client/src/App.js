import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Pages/Login';
import API from './utils/API';
import LandingPage from './Pages/LandingPage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.getItem("jwtToken"),
      redirect: false,
      username: "",
      password: ""
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
    if (this.state.username && this.state.password) {
      API.login({
        username: this.state.username,
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