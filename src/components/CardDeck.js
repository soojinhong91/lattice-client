import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'

class CardDeck extends Component {
  render() {
    return(
      <div>
        <h1>CardDeck coming soon</h1>
        <Card />
      </div>

    );
  }
}

class Card extends Component {

  render() {
    // console.log(this.state.data.cards)
    return(
      // console.log(this.props.project.cards)
      <div>
        <p>card will be displayed</p>
        <Task />
      </div>

    );
  }
}

export default CardDeck;

// render a Task component and pass a card prop with the card object
// <Task card={ pass the card object here }/>
