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
      card_id: (this.props.cardIndex + 1), //+1 because of 0 index in cardIndex array
    }, {withCredentials: true}).then( (res) => {
      this.setState({ taskDetail: ''});
      this.props.updateTasks(this.props.cardIndex, res.data )
      console.log(res.data)
    } );
  }


//is this where we add the function?
  render() {
    return(
      <TaskForm onBlur={ this.saveTaskDetailChange }/>
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
    this.setState({ taskDetailChanged: event.target.value });
  }

  _handleTaskSubmit(event) {
    console.log(event.target.value)
    this.props.onBlur( this.state.taskDetailChanged );
    this.setState({ taskDetailChanged: '' });
  }

  render() {
    return(
      <div>
        <textarea
          value={ this.state.taskDetailChanged }
          placeholder="Add your task"
          required
          onChange={ this._handleTaskChange }
          onBlur={ this._handleTaskSubmit }>
        </textarea>
      </div>

    );
  }
}

export default Task;


//make an axios request to the db for all of the tasks
//iterate over all of the tasks on the json page
//map the tasks to their own unique paragraphs

//somehow, you have to allow for the creation of new tasks
//that means...
