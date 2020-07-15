import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL_TASKS = 'http://localhost:3000/tasks'

class Task extends Component {
  constructor() {
    super();
    this.state = {
      taskDetail: ''
    }
    this.saveTaskDetailChange = this.saveTaskDetailChange.bind(this);
  }



  saveTaskDetailChange(detail) {
    if (detail === ''){
      return
    };
    axios.post(SERVER_URL_TASKS, {
      description: detail,
      card_id: this.props.cardIndex, //change this to actual card idea
    }, {withCredentials: true}).then( (res) => {
      this.setState({ taskDetail: res.data.task.description});
      console.log(res.data)
    } );
  }



  render() {
    return(
      <div>
        <h3>Tasks</h3>
        <TaskForm onFocusout={ this.saveTaskDetailChange }/>
      </div>
    );
  }
}

class TaskForm extends Component {
  constructor() {
    super();
    this.state = { taskDetailChanged : '' };
    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleTaskSubmit = this._handleTaskSubmit.bind(this);
  }

  _handleTaskChange(event) {
    console.log(event.target.value)
    this.setState({ taskDetailChanged: event.target.value});
  }

  _handleTaskSubmit(event) {
    this.props.onFocusout( this.state.taskDetailChanged );
    this.setState({ taskDetailChanged: '' });
  }

  render() {
    return(
        <textarea value={ this.state.taskDetailChanged } required cols="30" rows="1" onChange={ this._handleTaskChange } onBlur={ this._handleTaskSubmit }></textarea>
    );
  }
}

export default Task;


//make an axios request to the db for all of the tasks
//iterate over all of the tasks on the json page
//map the tasks to their own unique paragraphs

//somehow, you have to allow for the creation of new tasks
//that means...
