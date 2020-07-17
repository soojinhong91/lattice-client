import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Login from './registrations/Login'
import Signup from './registrations/Signup'
import Lattice from './Lattice';


// const LOGOUT_URL = 'http://localhost:3000/logout'
const LOGOUT_URL = 'https://lattice-server.herokuapp.com/logout'


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingLogin: false,
      showingSignup: false,
    }
  }

    handleClick = () => {
      axios.delete(LOGOUT_URL, {withCredentials: true})
       .then(response => {
         this.props.handleLogout()
         this.props.history.push('/')
       })
     .catch(error => console.log(error))
    }

    toggleSignup = () => this.setState({showingSignup: true, showingLogin: false })
    toggleLogin = () => this.setState({showingSignup: false, showingLogin: true })


  render() {
  return (

      <div>
        {
          this.props.loggedInStatus
          ? null
          :  <div>
              <h1>Lattice</h1>
              <Button onClick={ this.toggleLogin } variant="contained" type="submit" placeholder="submit" color="primary">
                Log In
              </Button>
              <Button onClick={ this.toggleSignup } variant="contained" type="submit" placeholder="submit" color="secondary">
                Sign Up
              </Button>
              <br></br>
              { this.state.showingLogin && <Login handleLogin={this.props.handleLogin}/> }
              { this.state.showingSignup && <Signup handleLogin={ this.props.handleLogin }/> }
            </div>
        }

        {
          this.props.loggedInStatus
          ? <div>
              <h1>Lattice</h1>
              <Button variant="contained" to='/logout' onClick={this.handleClick}>Log Out</Button>
              <Lattice />
            </div>
          : null
        }
      </div>
    );
  }
};

export default Home;
