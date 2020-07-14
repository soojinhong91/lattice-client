import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'


const SERVER_URL_CARDS = `http://localhost:3000/cards`

class Card extends Component {
  constructor() {
    super();
  }

  render() {
    // console.log(this.state.data.cards)
    return(
      // console.log(this.props.project.cards)
      <div>
        <p>{this.props.project.cards } hello</p>
      </div>
    );
  }
}

export default Card;

// render a Task component and pass a card prop with the card object
// <Task card={ pass the card object here }/>
