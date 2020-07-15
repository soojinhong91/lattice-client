import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'

class CardDeck extends Component {
  render(props) {
    console.log(this.props.projectCards)
    return(
      <div>
        <h2>Card Titles</h2>
        { this.props.projectCards.cards && this.props.projectCards.cards.map((c, i) =>
          <div>
            <h3 key={ c.id }>{c.name}</h3>
            <Card cardIndex={i} cards={this.props.projectCards}/>
          </div>
        )}
      </div>
    );
  }
}

class Card extends Component {

  render(props) {
    return(
      <div>
        {this.props.cards.tasks[this.props.cardIndex].map((t) =>
        <textarea key={t.id}>{t.description}</textarea>
      )}
      </div>

    );
  }
}

export default CardDeck;
