import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'

const SERVER_URL_CARDS = 'http://localhost:3000/cards'

class CardDeck extends Component {
  constructor() {
    super();
    this.state = {
      cardDetail: ''
    }
    this.saveCardDetailCreate = this.saveCardDetailCreate.bind(this);
  }

  saveCardDetailCreate(cardDetail) {
    if (cardDetail === '') {
      return
    };

    axios.post(SERVER_URL_CARDS, {
      name: cardDetail,
      project_id: 1, //placeholder
    }, {withCredentials:true}).then( (res) => {
      this.setState({ cardDetail: res.data.cards })
      console.log(res.data.cards)
    })
  }

  render(props) {
    console.log(this.props.projectCards)
    return(
      <div>
        <h2>Card Titles</h2>
        <CardForm onBlur={ this.saveCardDetailCreate }/>
        { this.props.projectCards.cards && this.props.projectCards.cards.map((c, i) =>
          <div>
            <h3 key={ c.id }>{ c.name }</h3>
            <Card cardIndex={i} cards={ this.props.projectCards }/>
          </div>
        )}

      </div>
    );
  }
}

class CardForm extends Component {
  constructor() {
    super();
    this.state = { cardDetailChanged : '' };
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleCardSubmit = this._handleCardSubmit.bind(this);
  }

  _handleCardChange(event) {
    console.log(event.target.value)
    this.setState({ cardDetailChanged: event.target.value });
  }

  _handleCardSubmit(event) {
    this.props.onBlur( this.state.cardDetailChanged );
    this.setState({ cardDetailChanged: '' });
  }

  render() {
    return(
      <textarea
        placeholder="Add new card"
        required
        cols="30" rows="1"
        onChange={ this._handleCardChange }
        onBlur={ this._handleCardSubmit }>
      </textarea>
    );
  }
}


class Card extends Component {
  render(props) {
    return(
      <div>
        {this.props.cards.tasks[this.props.cardIndex].map((t) =>
        <div>
          <textarea key={t.id}>{t.description}</textarea>

        </div>
      )}
      <Task />
      </div>

    );
  }
}

export default CardDeck;
