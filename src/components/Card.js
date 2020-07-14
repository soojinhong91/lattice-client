import React, { Component } from 'react';
import axios from 'axios';
import Task from './Task'


const SERVER_URL_CARDS = `http://localhost:3000/cards`

class Card extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentData: []
    };

  const fetchTasks = () => {
    axios.get(SERVER_URL_CARDS).then( (res) => {
      this.setState({data: res.data});
    })
  }

    // fetchTasks();
  }

  currentCards = () => {
    let currentData = []
    for (let i = 0; i < this.state.data.cards.length; i++){
      if (this.state.data.cards[i].project_id === this.props.project){
        currentData.push(this.state.data.cards[i])
      }
    }
    this.setState({currentData: currentData})
  }

  render() {
    // console.log(this.state.currentData)
    // console.log(this.props.project)
    return(
      // console.log(this.props.project.cards.name)
      <div>
        <p>{this.props.project} hello</p>
        <Task />
      </div>
    );
  }
}

export default Card;
