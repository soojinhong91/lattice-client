import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';



class CardDeck extends Component {
  render(props) {
    console.log(this.props.projectCards)
    return(
      <Card>
        <CardContent>
          <h2>Card Titles</h2>
          { this.props.projectCards.cards && this.props.projectCards.cards.map((c, i) =>
            <div>
              <h3 key={ c.id }>{c.name}</h3>
              <SingleCard cardIndex={i} cards={this.props.projectCards}/>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

class SingleCard extends Component {

  render(props) {
    console.log(this.props.cardIndex)
    return(
      <div>
        {this.props.cards.tasks[this.props.cardIndex].map((t) =>
        <div>
          <textarea key={t.id}>{t.description}</textarea>
        </div>
      )}
      <Task cardIndex={this.props.cardIndex}/>
      </div>
    );
  }
}

export default CardDeck;
