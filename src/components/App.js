import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'fontsource-roboto';
// import { Typography } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import Home from './Home'
// import Login from './registrations/Login'
// import Signup from './registrations/Signup'

// import Lattice from './Lattice';

// const LOGGED_IN_URL = 'http://localhost:3000/logged_in'
const LOGGED_IN_URL = 'https://lattice-server.herokuapp.com/logged_in'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }

  componentDidMount() {
    this.loginStatus()
  }

    loginStatus = () => {
      axios.get(LOGGED_IN_URL,
     {withCredentials: true})

      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
    }

    handleLogin = (data) => {
     this.setState({
       isLoggedIn: true,
       user: data.user
     })
    }

    handleLogout = (redirect) => {
     this.setState({
       isLoggedIn: false,
       user: {}
     }, redirect)
    }

    render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route
                exact path='/'
                render={props => (
                  <Home {...props}
                    handleLogout={this.handleLogout}
                    handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                  )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
export default App;
