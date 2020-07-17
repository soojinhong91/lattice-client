import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      project_id: this.props.projectCards.id,
    }, {withCredentials:true}).then( (res) => {
      this.setState({ cardDetail: '' })
      console.log(res.data)
      this.props.updateCards(res.data)
    })
  }



  render(props) {
    console.log(this.props.projectCards)
    return(
      <div className="main">
        <Card>
          <CardContent>
          <h3><CardForm
                onBlur={ this.saveCardDetailCreate }
                /></h3>
            { this.props.projectCards.cards && this.props.projectCards.cards.map((c, i) =>
              <div class="cardlist">

                <textarea class="existingcard" cols="18" rows="1" key={ c.id }>{c.name}</textarea>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Delete C
                </Button>

                <SingleTask cardIndex={i} cards={this.props.projectCards}/>
                <Task cardIndex={i} updateTasks={this.props.updateTasks}/>
              </div>
            )}
          </CardContent>
        </Card>
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
        class="create"
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
    console.log(this.props.cardIndex)
    console.log(this.props.cards.cards[0].tasks) //these are tasks
    return(
      <div class="tasklist">
        {this.props.cards.cards[this.props.cardIndex].tasks.map((t) =>
          <div>
            <textarea class="task" key={t.id}>{t.description}</textarea>
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >Delete this task</Button>
          </div>
        )}
      </div>
    );
  }
}

export default CardDeck;
