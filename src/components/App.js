import React, { Component } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import {BrowserRouter, Switch, Route} from 'react-router-dom'
=======
import {BrowserRouter, Switch, Route} from 'react-router-dom';
>>>>>>> 82b3d024d8eddea9659b7487ca61db177d20bb40
import Home from './Home'
import Login from './registrations/Login'
import Signup from './registrations/Signup'

import Lattice from './Lattice';

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
      axios.get('http://localhost:3000/logged_in',
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
      console.log(data)
     this.setState({
       isLoggedIn: true,
       user: data.user
     })
    }

    handleLogout = () => {
     this.setState({
       isLoggedIn: false,
       user: {}
     })
    }

    render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route
                exact path='/'
                render={props => (
                <Home {...props} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/login'
                render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/signup'
                render={props => (
                <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
              />
              <Route
                exact path='/'
                render={props => (
                <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>)}
                 />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
export default App;
