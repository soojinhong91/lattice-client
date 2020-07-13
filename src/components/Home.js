import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router';

class Home extends Component {
  constructor(props) {
    super();
    console.log(props)
    // this.handleLogout = this.props.handleLogout
  }

    handleClick = () => {
      axios.delete('http://localhost:3000/logout', {withCredentials: true})
       .then(response => {
         this.props.handleLogout(this.redirect)

       })
     .catch(error => console.log(error))
      }
  redirect = () => this.props.history.push('/')

  render() {
    return (
        <div>
          {
            this.props.loggedInStatus
            ?<button onClick={ this.handleClick }>Log Out</button>
            : <div>
                <Link to='/login'>Log In</Link>
                <br></br>
                <Link to='/signup'>Sign Up</Link>
                <br></br>
              </div>
          }
        </div>
      );
  };
}




export default Home;
