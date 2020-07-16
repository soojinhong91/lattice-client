import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const SERVER_URL_CARDS = 'http://localhost:3000/cards'
// const SERVER_URL_CARDS = 'https://lattice-server.herokuapp.com/cards'

class CardDeck extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      cardDetail: '',
    }
    this.saveCardDetailCreate = this.saveCardDetailCreate.bind(this);
  }

  saveCardDetailCreate(cardDetail) {
    if (cardDetail === '') {
      return
    };
    axios.post(SERVER_URL_CARDS, {
      name: cardDetail,
      project_id: this.props.projectCards.id,
    }, {withCredentials:true}).then( (res) => {
      this.setState({ cardDetail: '', allCards: [...this.state.allCards, this.props.allCards] })
      console.log(res.data)
      debugger
      this.props.updateCards(res.data)
    })
  }


  render(props) {
    // console.log(this.props.projectCards.cards)
    return(
      <Card>
        <CardContent>
          <CardForm onBlur={ this.saveCardDetailCreate }/>
            { this.props.projectCards.cards && this.props.projectCards.cards.map((c, i) =>
              <div>
                <h3 key={ c.id }>{c.name}</h3>
                <button>
                  Delete this Card
                </button>
                <SingleTask cardIndex={i} cards={this.props.projectCards}/>
                <Task cardIndex={i} updateTasks={this.props.updateTasks}/>
              </div>
            )}
        </CardContent>
      </Card>
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
    this.setState({ cardDetailChanged: event.target.value });
  }

  _handleCardSubmit(event) {
    event.preventDefault()
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
        onBlur={ this._handleCardSubmit }
        value={this.state.cardDetailChanged}>
      </textarea>
    );
  }
}

class SingleTask extends Component {
  render(props) {
    // console.log(this.props.cardIndex)
    // console.log(this.props.cards.cards[0].tasks) //these are tasks
    return(
      <div>
        {this.props.cards.cards[this.props.cardIndex].tasks.map((t) =>
          <div>
            <textarea key={t.id}>{t.description}</textarea>
            <button>Delete this task</button>
          </div>
        )}
      </div>
    );
  }
}

export default CardDeck;
